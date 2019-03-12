import {
    GET_STORES,
    GOT_STORES,
    GET_STORE,
    GOT_STORE,
    GET_STORES_FAIL
} from '../constants/actiontypes';

export const getStores = () => ({
    type: GET_STORES,
});

export const gotStores = stores => ({
    type: GOT_STORES,
    payload: { stores },
});

export const getStoresFail = error => ({
    type: GET_STORES_FAIL,
    payload: { error },
})

export const getStore = () => ({
    type: GET_STORE,
});

export const gotStore = store => ({
    type: GOT_STORE,
    payload: { store },
});
