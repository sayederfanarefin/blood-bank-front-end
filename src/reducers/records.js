import {
  FETCH_RECORDS, FETCH_RECORD, REGISTER_RECORD,
  DELETE_RECORD, SET_INITIAL_REGISTER_RECORD, UPDATE_RECORD
} from 'constants/actionTypes';

const initialState = {
  // fetch Records status
  recordsRequest: false,
  data: null,
  recordsError: null,
  // fetch active Record status
  recordRequest: false,
  activeRecord: null,
  recordError: null,
  // delete Record status
  deleteRequest: false,
  deleteSuccess: null,
  deleteError: null,
  // add Record status
  registerRecordRequest: false,
  registerRecordData: null,
  registerRecordError: null,

  // update Record status
  updateRecordRequest: false,
  updateRecordData: null,
  updateRecordError: null,

  // for form
  initialRecordRegistration: null
};

export default function (state = initialState, action) {
  switch (action.type) {

    // Fetch Records
    case FETCH_RECORDS.REQUEST:
      return Object.assign({}, state, {
        recordsRequest: true,
        data: null,
        recordsError: null
      });
    case FETCH_RECORDS.SUCCESS:
      return Object.assign({}, state, {
        recordsRequest: false,
        data: action.response,
        recordsError: null
      });
    case FETCH_RECORDS.FAILURE:
      return Object.assign({}, state, {
        recordsRequest: false,
        data: null,
        recordsError: action.error
      });

    // Fetch Record
    case FETCH_RECORD.REQUEST:
      return Object.assign({}, state, {
        recordRequest: true,
        activeRecord: null,
        recordError: null
      });
    case FETCH_RECORD.SUCCESS:
      return Object.assign({}, state, {
        recordRequest: false,
        activeRecord: action.response,
        recordError: null
      });
    case FETCH_RECORD.FAILURE:
      return Object.assign({}, state, {
        recordRequest: false,
        activeRecord: null,
        recordError: action.error
      });

    // Delete Record
    case DELETE_RECORD.REQUEST:
      return Object.assign({}, state, {
        deleteRequest: true,
        deleteSuccess: null,
        deleteError: null
      });
    case DELETE_RECORD.SUCCESS:
      const newRecordsList = state.data.filter(record => record.id !== action.response);

      return Object.assign({}, state, {
        deleteRequest: false,
        deleteSuccess: action.response,
        data: newRecordsList,
        deleteError: null
      });
    case DELETE_RECORD.FAILURE:
      return Object.assign({}, state, {
        deleteRequest: false,
        deleteSuccess: null,
        deleteError: action.error
      });

    // Register Record data
    case REGISTER_RECORD.REQUEST:
      return Object.assign({}, state, {
        registerRecordRequest: true,
        registerRecordData: null,
        registerRecordError: null
      });
    case REGISTER_RECORD.SUCCESS:
      const data = state.data.slice();

      data.push(action.response);

      return Object.assign({}, state, {
        registerRecordRequest: false,
        registerRecordData: action.response,
        registerRecordError: null,
        data
      });
    case REGISTER_RECORD.FAILURE:
      return Object.assign({}, state, {
        registerRecordRequest: false,
        registerRecordData: null,
        registerRecordError: action.error
      });

    // Update Record data
    case UPDATE_RECORD.REQUEST:
      return Object.assign({}, state, {
        updateRecordRequest: true,
        updateRecordData: null,
        updateRecordError: null
      });
    case UPDATE_RECORD.SUCCESS:
      const updatedData = state.data.map(record => 
        (record.id === action.response.id) ? action.response : record
      );

      return Object.assign({}, state, {
        updateRecordRequest: false,
        updateRecordData: true,
        updateRecordError: null,
        data: updatedData
      });
    case UPDATE_RECORD.FAILURE:
      return Object.assign({}, state, {
        updateRecordRequest: false,
        updateRecordData: null,
        updateRecordError: action.error
      });

    // initial value for redux-form
    case SET_INITIAL_REGISTER_RECORD:
      return Object.assign({}, state, {
        initialRecordRegistration: action.name ? action : null
      });

    default:
      return state;
  }
}
