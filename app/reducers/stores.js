import {
    GET_STORES,
    GOT_STORES,
} from '../constants/actiontypes';

const initialState = {
    loading: true,
    stores: []
};

export default function stores(state = initialState, action) {
    switch(action.type) {
        case GET_STORES:
            return initialState;
        case GOT_STORES:
            return {...state, stores: action.payload.stores, loading: false};
        default:
            return state;
    }
}
