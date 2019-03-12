import { all } from 'redux-saga/effects';
import { watchGetStores } from './stores';

export default function* rootSaga() {
    yield all([
        watchGetStores(),
    ])
}
