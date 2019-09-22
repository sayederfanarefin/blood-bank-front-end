// @flow
import axios from 'axios';
import 'isomorphic-fetch';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../store';
import { API_URL, FIREBASE_CONFIG } from 'constants/config';
import { AUTH_LOGOUT } from 'constants/actionTypes';

export default class APIService {
  auth: object = null;
  PROXY_ROOT: string = '/api';

  constructor() {
    const AUTH_TOKEN = localStorage.getItem('auth_token');

    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'DELETE, POST, GET, OPTIONS';
    axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With';
    // axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
    
    this.firebaseInit()

    if (AUTH_TOKEN) {
      this.updateTokenKey(AUTH_TOKEN);
    }

    this.handleAllRequestTokenIssues();
  }

  updateProxy = (newProxy: string) => {
    this.PROXY_ROOT = newProxy;
  }

  updateTokenKey = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  firebaseInit = async () => {
    if (!this.auth) {
      if (!firebase.apps.length)
        await firebase.initializeApp(FIREBASE_CONFIG)

      const basic = await firebase.auth()
      const google = await new firebase.auth.GoogleAuthProvider()
      const facebook = await new firebase.auth.FacebookAuthProvider()
      const twitter = await new firebase.auth.TwitterAuthProvider()

      this.auth = {
        basic,
        google,
        facebook,
        twitter
      };
    }

    // console.log('firebaseInit can resolve now: ', this.auth)
    return Promise.resolve(this.auth);
  }

  handleAllRequestTokenIssues = () => {
    axios.interceptors.request.use( async (config) => {
      console.log('axios.interceptors.request config: ', config)
      await this.firebaseInit();
      return config;
    }, error => {
      console.log('axios.interceptors.request error: ', error)
      return Promise.reject(error)
    })

    axios.interceptors.response.use(null, async (error) => {
      console.log('axios.interceptors.response error: ', error)

      if (error.config && error.response && error.response.status === 401) {
        console.log('before if this.auth.basic.currentUser: ', this.auth.basic.currentUser)

        return this.auth.basic.onAuthStateChanged(async (user) => {

          console.log('user: ', user)
          if (user) {
            const token = await user.getIdToken(true)
                .then(userToken => userToken)

            error.config.headers.Authorization = `Bearer ${token}`;
            this.updateTokenKey(token);

            localStorage.setItem("auth_token", token)

            console.log('token: ', token)

            // console.log('Request again error.config: ', error.config)
            return window.location.reload();
            // return axios(error.config);
          }
          else {

            console.log('else logout call()')

            store.dispatch({
              type: AUTH_LOGOUT.REQUEST
            })  
          }
        });
      }

      return Promise.reject(error)
    });
  }

  callApi = (request: string, endpoint: string, params?: Object) => {
    const fullUrl = `${this.PROXY_ROOT}/${endpoint}`;
    return axios[request](fullUrl, params);
  }

  /**
   * Auth actions service
   * @type BEGIN
   */
  // User login service
  login = async (params: Object) => {
    let { email, password, service } = params;
    const { basic, facebook, twitter, google } = this.auth;

    let data;
    switch(service) {
      case "facebook-square":
      data = await basic.signInWithPopup(facebook)
          .then(data => {
            email = data.user.email
            return data.user.uid
          })
          .catch(e => e)
          break;
      case "twitter":
      data = await basic.signInWithPopup(twitter)
          .then(data => {
            email = data.user.email
            return data.user.uid
          })
          .catch(e => e)
          break;
      case "google":
      data = await basic.signInWithPopup(google)
          .then(data => {
            email = data.user.email
            return data.user.uid
          })
          .catch(e => e)
        break;
      default:
      data = await basic.signInWithEmailAndPassword(email, password)
          .then((data) => data.user.uid)
    }

    if (data.message) {
      return new Promise((resolve, reject) => reject(data))
    }

    return basic.currentUser.getIdToken(true)
      .then((userToken) => ({
        token: userToken,
        user: {
          userId: data,
          email
        }
      }));
  };

  // User register service
  register = async (params: Object) => {
    const { email, password } = params;
    const { basic } = this.auth;

    const id = await basic.createUserWithEmailAndPassword(email, password)
      .then(data => data.user.uid);

    return basic.currentUser.getIdToken(true)
      .then(userToken => ({
        token: userToken,
        user: {
          userId: id,
          email
        }
      }));
  }

  // Forgot password service
  forgotPassword = async (params: Object) => {
    const { email } = params;
    const { basic } = this.auth;

    return basic.sendPasswordResetEmail(email)
      .then(data => ({ data }));

    // return basic.currentUser.getIdToken(true)
    //   .then(userToken => ({
    //     token: userToken,
    //     user: { id, email }
    //   }));
  };

  // Update password service
  updatePassword = async (params: Object) => {
    const { oldPassword, newPassword } = params;
    const { basic } = this.auth;
    const userData = localStorage.getItem("user");

    const credential = firebase.auth.EmailAuthProvider.credential(
      JSON.parse((userData || "{}")).email,
      oldPassword
    );

    const user = await basic.currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
      .then(data => data.user);

    return user.updatePassword(newPassword)
      .then(() => true);
  };

  // User logout service
  logout = () => this.auth.basic.signOut();
  /**
   * Auth actions service
   * @type END
   */

  /**
   * User actions service
   * @type BEGIN
   */
  // Create user
  createUser = (params: Object) => this.callApi('post', 'configuration/createUserProfile', params);

  // Get user
  getUser = (params: Object) => this.callApi('get', `Configuration/GetUserProfile/${params.id}`, params);

  // Update user
  updateUser = (params: Object) => this.callApi('post', 'Configuration/UpdateUserProfile', params);

  // Payment
  payment = (params: Object) => this.callApi('post', 'Payment/Post', params);
  /**
   * User actions service
   * @type END
   */

  /**
   * Dashboard actions service
   * @type BEGIN
   */
  // Dashboard service
  fetchDashboard = (params: Object) => this.callApi('get', `Dashboard/${params.uid}/${params.vin}`);

  // 24 hours SOC
  fetch24HoursSOC = (params: Object) => this.callApi('get', `Dashboard/GetSOCLast24H/${params.vin}`);

  // Histogram service
  fetchHistogram = (params: Object) => this.callApi('get', 'Histogram/Get', params);

  // TimeZone service
  fetchTimeZoneList = (params: Object) => this.callApi('get', 'Configuration/GetTimeZoneList');
  /**
   * Dashboard actions service
   * @type END
   */

  /**
   * Vehicle actions service
   * @type BEGIN
   */
  // Vehicles service
  fetchVehicles = (params: Object) => this.callApi('get', `Configuration/GetUserVehicles/${params.email}/${params.id}`);

  // Register Vehicle service
  registerVehicle = (params: Object) => this.callApi('post', `Configuration/RegisterVehicle/${params.userEmail}/${params.uid}`, params);

  // Update Vehicle service
  updateVehicle = (params: Object) => this.callApi('post', 'Vehicle/Post', params);

  // Delete Vehicle service
  deleteVehicle = (params: Object) => this.callApi('delete', `Vehicle/${params.id}`);

  // Vehicle service by hour
  fetchVehicleHourly = (params: Object) => this.callApi('get', `VehicleData/GetLast24HoursReading/${params.vin}`);

  // Vehicle service by daily
  fetchVehicleDaily = (params: Object) => this.callApi('get', `VehicleData/GetDailyData/${params.vin}/${params.date}`);

  // Vehicle service by weekly
  fetchVehicleWeekly = (params: Object) => this.callApi('get', `VehicleData/GetWeeklyData/${params.vin}/${params.date}`);

  // Vehicle service by monthly
  fetchVehicleMonthly = (params: Object) => this.callApi('get', `VehicleData/GetAllMonthsData/${params.vin}`);
  /**
   * Vehicle actions service
   * @type END
   */

  /**
   * Geofence actions service
   * @type BEGIN
   */
  // Geofences service
  fetchGeofences = (params: Object) => this.callApi('get', `Configuration/GetUserGeofences/${params.email}/${params.id}`);

  // Register Geofence service
  registerGeofence = (params: Object) => this.callApi('post', `Configuration/RegisterGeofence/${params.userEmail}/${params.uid}`, params);

  // Update Geofence service
  updateGeofence = (params: Object) => this.callApi('post', 'Geofence/Post', params);

  // Delete Geofence service
  deleteGeofence = (params: Object) => this.callApi('delete', `Geofence/${params.id}`);
  /**
   * Geofence actions service
   * @type END
   */



  /**
   * Map actions service
   * @type BEGIN
   */
  // Fethcing Map data
  fetchMap = (params: Object) => this.callApi('get', `Map/GetMap/${params.vin}/${params.date}`);
  /**
   * Map actions service
   * @type END
   */
}
