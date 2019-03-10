import {
    GET_STORES,
    GOT_STORES,
    GET_STORE,
    GOT_STORE
} from '../constants/actiontypes';

export const getStores = () => ({
    type: GET_STORES,
});

export const gotStores = stores => ({
    type: GOT_STORES,
    payload: { stores },
});

export const getStore = () => ({
    type: GET_STORE,
});

export const gotStore = store => ({
    type: GOT_STORE,
    payload: { store },
});
