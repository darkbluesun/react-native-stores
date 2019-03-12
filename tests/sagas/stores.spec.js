import 'isomorphic-fetch';
import { getStores, watchGetStores } from "../../app/sagas/stores";
import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';
import { GET_STORES } from '../../app/constants/actiontypes';

describe('getStores', () => {
  const StoresList = [{id: 1, name: 'new store 1'}];
  test('should handle success', async () => {
    const dispatched = [];
    const dispatch = (action) => { dispatched.push(action) };

    const mockPromise = Promise.resolve({
        ok: true,
        json: () => StoresList,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
    const stores = await runSaga({
        dispatch,
        getState: () => ({loading: false})
    }, getStores);
    expect(global.fetch).toMatchSnapshot();
    expect(dispatched).toMatchSnapshot();
    global.fetch.mockClear();
  });
  test('should handle failure', async () => {
    const dispatched = [];
    const dispatch = (action) => { dispatched.push(action) };

    const mockPromise = Promise.resolve({
        ok: false,
        statusText: '404 Not Found',
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
    const stores = await runSaga({
        dispatch,
        getState: () => ({loading: false})
    }, getStores);
    expect(global.fetch).toMatchSnapshot();
    expect(dispatched).toMatchSnapshot();
    global.fetch.mockClear();
  });
  test('should wait for GET_STORES', () => {
    const saga = watchGetStores();
    expect(saga.next().value).toEqual(takeLatest(GET_STORES, getStores))
  });
});
