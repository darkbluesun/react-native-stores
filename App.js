import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import stores from './app/reducers/stores';
import store from './app/reducers/store';
import StoresList from './app/containers/stores';
import StoreDetails from './app/containers/storeDetails';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: StoresList,
  StoreDetails: StoreDetails,
});

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.store = configureStore({
        reducer: { stores, store }
    });
  }
  render() {
    return (
      <Provider store={this.store}>
        <Navigation />
      </Provider>
    );
  }
}
