import { put, call, takeLatest } from 'redux-saga/effects'
import settings from '../config/settings';
import { gotStores, getStoresFail } from '../actions/stores';
import { handleErrors } from '../utilities'

export function* getStores() {
    try {
        const response = yield call(fetch, settings.apiUrl + 'stores')
        handleErrors(response);
        const stores = response.json();
        yield put(gotStores(stores));
    } catch (error) {
        yield put(getStoresFail(error))
    }
}

export function* watchGetStores() {
    yield takeLatest('GET_STORES', getStores)
}