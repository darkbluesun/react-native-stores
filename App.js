import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga'
import reducer from './app/reducers';
import sagas from './app/sagas';
import StoresList from './app/containers/stores';
import StoreDetails from './app/containers/storeDetails';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: StoresList,
  StoreDetails: StoreDetails,
});

const Navigation = createAppContainer(MainNavigator);

const sagaMiddleware = createSagaMiddleware();


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(sagas);
  }
  render() {
    return (
      <Provider store={this.store}>
        <Navigation />
      </Provider>
    );
  }
}
