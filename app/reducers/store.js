import {
    GET_STORE,
    GOT_STORE,
    GET_STORE_FAIL,
    GET_STORE_BRANCHES,
    GOT_STORE_BRANCHES,
    GET_STORE_BRANCHES_FAIL,
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
        case GET_STORE_FAIL:
            return {...state, store: {}, loading: false, error: action.payload.error};
        case GET_STORE_BRANCHES:
            return {...state, loading: true};
        case GOT_STORE_BRANCHES:
            return {...state, loading: false, store: {...state.store, branches: action.payload.branches}};
        case GET_STORE_BRANCHES_FAIL:
            return {...state, loading: false, error: action.payload.error};
        default:
            return state;
    }
}
