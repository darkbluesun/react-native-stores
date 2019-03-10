import React from 'react';
import Main from './app/screens/Main';
import StoreDetails from './app/screens/storeDetails';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: Main},
  StoreDetails: {screen: StoreDetails}
});

const App = createAppContainer(MainNavigator);

export default App;
