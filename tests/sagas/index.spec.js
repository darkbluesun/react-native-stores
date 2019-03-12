import rootSaga from "../../app/sagas";
import { all } from "redux-saga/effects";
import { watchGetStores } from "../../app/sagas/stores";

describe('rootSaga', () => {
    test('should yield all sagas', () => {
        const saga = rootSaga();    
        expect(saga.next().value).toMatchSnapshot();
    });
})
