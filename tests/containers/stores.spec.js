import 'isomorphic-fetch';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import StoresList from '../../app/containers/stores';

jest.mock('ScrollView', () => require.requireMock('ScrollViewMock'));

const stores = [{id: 1, name: 'store 1'}];
const mockPromise = Promise.resolve({
    ok: true,
    json: () => stores,
});
const initialState = {stores: {loading: false, stores: []}}; 
const mockStore = configureStore();
let wrapper;
let store;

jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

describe('containers.stores', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = renderer.create(<Provider store={store}><StoresList /></Provider>)
    })
  test('should render', (done) => {
      process.nextTick(() => {
        expect(wrapper.toJSON()).toMatchSnapshot();
        done();
      });
  });
});
