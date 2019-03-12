import 'isomorphic-fetch';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import StoreDetails from '../../app/containers/storeDetails';

jest.mock('ScrollView', () => require.requireMock('ScrollViewMock'));

const stores = [{id: 1, name: 'store 1'}];
const mockPromise = Promise.resolve({
    ok: true,
    json: () => stores,
});
const navigation = {
    getParam: () => 1,
}
const initialState = {store: {loading: false, store: {}}}; 
const mockStore = configureStore();
let wrapper;
let store;

jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);

describe('containers.stores', () => {
    beforeEach(() => {
        store = mockStore(initialState);
        wrapper = renderer.create(<Provider store={store}><StoreDetails navigation={navigation} /></Provider>)
    })
  test('should render', (done) => {
      process.nextTick(() => {
        expect(wrapper.toJSON()).toMatchSnapshot();
        done();
      });
  });
});
