import { put, call, all, takeLatest } from 'redux-saga/effects'
import settings from '../config/settings';
import { gotStores } from '../actions/stores';

const handleErrors = function(response) {
    if (!response.ok) throw Error(response.statusText);
    return response;
  }

export function* getStores() {
    try {
        const response = yield call(fetch, settings.apiUrl + 'stores')
        handleErrors(response);
        const stores = response.json();
        yield put(gotStores(stores));
    } catch (error) {
        console.error(error);
    }
}

export function* watchGetStores() {
    yield takeLatest('GET_STORES', getStores)
}

export default function* rootSaga() {
    yield all([
        watchGetStores(),
    ])
}
