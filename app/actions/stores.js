import {
    GET_STORES,
    GOT_STORES,
    GET_STORE,
    GOT_STORE,
    GET_STORES_FAIL,
    GET_STORE_FAIL,
    GET_STORE_BRANCHES,
    GOT_STORE_BRANCHES,
    GET_STORE_BRANCHES_FAIL
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

export const getStoreFail = error => ({
    type: GET_STORE_FAIL,
    payload: { error },
});

export const getStoreBranches = (id) => ({
    type: GET_STORE_BRANCHES,
    payload: { id }
});

export const gotStoreBranches = (branches) => ({
    type: GOT_STORE_BRANCHES,
    payload: { branches },
});

export const getStoreBranchesFail = (error) => ({
    type: GET_STORE_BRANCHES_FAIL,
    payload: { error },
});
