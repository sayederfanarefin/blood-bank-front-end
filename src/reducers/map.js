import { FETCH_MAP_DATA } from 'constants/actionTypes';
  
const initialState = {
    data: null,
    // user create
    mapRequest: false,
    mapError: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        // User create status
        case FETCH_MAP_DATA.REQUEST:
            return Object.assign({}, state, {
                mapRequest: true,
                data: null,
                mapError: null
            });
        case FETCH_MAP_DATA.SUCCESS:
            return Object.assign({}, state, {
                mapRequest: false,
                data: action.response,
                mapError: null
            });
        case FETCH_MAP_DATA.FAILURE:
            return Object.assign({}, state, {
                mapRequest: false,
                data: null,
                mapError: action.error
            });

        default:
            return state;
    }
}
  