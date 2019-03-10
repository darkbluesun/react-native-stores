import {
    GET_STORE,
    GOT_STORE,
} from '../constants/actiontypes';

const initialState = {
    loading: true,
    store: {}
};

export default function stores(state = initialState, action) {
    switch(action.type) {
        case GET_STORE:
            return initialState;
        case GOT_STORE:
            return {...state, store: action.payload.store, loading: false};
        default:
            return state;
    }
}
