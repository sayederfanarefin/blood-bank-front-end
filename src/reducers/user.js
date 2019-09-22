import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    USER_CREATE,
    USER_GET,
    USER_UPDATE,
    PAYMENT
} from '../constants/actionTypes';
  
const initialState = {
    data: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    // user create
    userInfoRequest: false,
    userInfoError: null,
    // fetching
    fetchingRequest: false,
    fetchingSuccess: false,
    fetchingError: null,
    // updating
    updateRequest: false,
    updateSuccess: false,
    updateError: null,
    // payment
    paymentRequest: false,
    paymentSuccess: false,
    paymentError: null,
};

export default function (state = initialState, action) {
    switch (action.type) {

        // If login success
        case AUTH_LOGIN.SUCCESS:
            return Object.assign({}, state, {
                data: action.response
            });

        // Logout
        case AUTH_LOGOUT.SUCCESS:
            return Object.assign({}, state, {
                data: null
            });

        // User create status
        case USER_CREATE.REQUEST:
            return Object.assign({}, state, {
                userInfoRequest: true,
                data: null,
                userInfoError: null
            });
        case USER_CREATE.SUCCESS:
            return Object.assign({}, state, {
                userInfoRequest: false,
                data: action.response,
                userInfoError: null
            });
        case USER_CREATE.FAILURE:
            return Object.assign({}, state, {
                userInfoRequest: false,
                data: null,
                userInfoError: action.error
            });

        // User get status
        case USER_GET.REQUEST:
            return Object.assign({}, state, {
                fetchingRequest: true,
                fetchingSuccess: false,
                fetchingError: null
            });
        case USER_GET.SUCCESS:
            return Object.assign({}, state, {
                fetchingRequest: false,
                fetchingSuccess: true,
                data: action.response,
                fetchingError: null
            });
        case USER_GET.FAILURE:
            return Object.assign({}, state, {
                fetchingRequest: false,
                fetchingSuccess: false,
                fetchingError: action.error
            });

        // User update status
        case USER_UPDATE.REQUEST:
            return Object.assign({}, state, {
                updateRequest: true,
                updateSuccess: false,
                updateError: null
            });
        case USER_UPDATE.SUCCESS:
            return Object.assign({}, state, {
                updateRequest: false,
                updateSuccess: true,
                data: action.response,
                updateError: null
            });
        case USER_UPDATE.FAILURE:
            return Object.assign({}, state, {
                updateRequest: false,
                updateSuccess: false,
                updateError: action.error
            });
        case USER_UPDATE.RESET:
            return Object.assign({}, state, {
                updateRequest: false,
                updateSuccess: false,
                updateError: null
            });

        // Payment status
        case PAYMENT.REQUEST:
            return Object.assign({}, state, {
                paymentRequest: true,
                paymentSuccess: false,
                paymentError: null
            });
        case PAYMENT.SUCCESS:
            return Object.assign({}, state, {
                paymentRequest: false,
                paymentSuccess: true,
                paymentError: null
            });
        case PAYMENT.FAILURE:
            return Object.assign({}, state, {
                paymentRequest: false,
                paymentSuccess: false,
                paymentError: action.error
            });

        default:
            return state;
    }
}
  