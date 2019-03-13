import { all, put, call, takeLatest } from 'redux-saga/effects'
import settings from "../config/settings";
import { handleErrors } from "../utilities";
import { 
    gotStore,
    getStoreFail,
    getStoreBranches,
    gotStoreBranches,
    getStoreBranchesFail
} from "../actions/stores";
import { GET_STORE, GET_STORE_BRANCHES } from '../constants/actiontypes';

export function* getStore(id) {
    try {
        const response = yield call(fetch, settings.apiUrl + 'store/' + id);
        handleErrors(response);
        const store = response.json();
        yield all([put(gotStore(store)), put(getStoreBranches(store.id))]);
    } catch (error) {
        yield put(getStoreFail(error));
    }
}

export function* watchGetStore() {
    yield takeLatest(GET_STORE, getStore);
}

export function* getStoreBranchesSaga(id) {
    try {
        const response = yield call(fetch, `${settings.apiUrl}'store/${id}/branches`)
        handleErrors(response);
        const branches = response.json();
        yield put(gotStoreBranches(branches));
    } catch (error) {
        yield put(getStoreBranchesFail(error));
    }
}

export function* watchGetBranches() {
    yield takeLatest(GET_STORE_BRANCHES, getStoreBranchesSaga);
}
