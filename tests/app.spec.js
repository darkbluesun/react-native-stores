
import React from 'react';
import { View } from "react-redux";
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import App from '../App';

const mockStore = configureStore();
const store = mockStore({
    user: {
      isLoaded: true,
    },
  });

jest.mock('react-navigation', () => ({
    createStackNavigator: () => ({}),
    createAppContainer: component => component,
}));

jest.mock('react-redux', () => ({
    createStore: () => mockStore({}),
    Provider: () => () => 'View'
}));

jest.mock('../app/containers/stores', () => () => 'View');
jest.mock('../app/containers/storeDetails', () => () => 'View');

describe('main app', () => {
    test('render', () => {
        const wrapper = renderer.create(<App/>);
        expect(wrapper).toMatchSnapshot();
    });
});