import 'isomorphic-fetch';
import { runSaga } from "redux-saga";
import { getStore, getStoreBranchesSaga, watchGetBranches } from '../../app/sagas/storeDetails';
import { GET_STORE_BRANCHES } from '../../app/constants/actiontypes';
import { takeLatest } from 'redux-saga/effects';

describe('getStore', () => {
  const store = {id: 1, name: 'store 1'};
  test('should handle success', async () => {
    const dispatched = [];
    const dispatch = (action) => { dispatched.push(action) };
    const mockPromise = Promise.resolve({
        ok: true,
        json: () => store,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
    await runSaga({
        dispatch,
        getState: () => ({loading: false}),
    }, getStore);
    expect(global.fetch).toMatchSnapshot();
    expect(dispatched).toMatchSnapshot();
    global.fetch.mockClear();
  });
  test('should handle failure', async () => {
    const dispatched = [];
    const dispatch = (action) => { dispatched.push(action) };
    const mockPromise = Promise.resolve({
        ok: false,
        statusText: 'not found',
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
    await runSaga({
        dispatch,
        getState: () => ({loading: false}),
    }, getStore);
    expect(global.fetch).toMatchSnapshot();
    expect(dispatched).toMatchSnapshot();
    global.fetch.mockClear();
  });
})

describe('getStoreBranches', () => {
  const branches = [{id: 2, name: 'store 2'}];
  test('should handle success', async () => {
    const dispatched = [];
    const dispatch = (action) => { dispatched.push(action) };
    const mockPromise = Promise.resolve({
        ok: true,
        json: () => branches,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
    await runSaga({
        dispatch,
        getState: () => ({loading: false}),
    }, getStoreBranchesSaga);
    expect(global.fetch).toMatchSnapshot();
    expect(dispatched).toMatchSnapshot();
    global.fetch.mockClear();
  });
  test('should handle failure', async () => {
    const dispatched = [];
    const dispatch = (action) => { dispatched.push(action) };
    const mockPromise = Promise.resolve({
        ok: false,
        statusText: 'not found',
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
    await runSaga({
        dispatch,
        getState: () => ({loading: false}),
    }, getStoreBranchesSaga);
    expect(global.fetch).toMatchSnapshot();
    expect(dispatched).toMatchSnapshot();
    global.fetch.mockClear();
  });
  test('should wait for GET_STORE_BRANCHES', () => {
    const saga = watchGetBranches();
    expect(saga.next().value).toEqual(takeLatest(GET_STORE_BRANCHES, getStoreBranchesSaga))
  });
})
