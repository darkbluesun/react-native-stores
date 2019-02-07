import React from 'react';
import StoresList from './app/screens/stores';
import StoreDetails from './app/screens/storeDetails';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: StoresList},
  StoreDetails: {screen: StoreDetails}
});

const App = createAppContainer(MainNavigator);

export default App;
