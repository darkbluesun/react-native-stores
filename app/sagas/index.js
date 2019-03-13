import { all } from 'redux-saga/effects';
import { watchGetStores } from './stores';
import { watchGetStore, watchGetBranches } from './storeDetails';

export default function* rootSaga() {
    yield all([
        watchGetStores(),
        watchGetStore(),
        watchGetBranches(),
    ])
}
