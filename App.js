import React from 'react';
import StoresList from './app/screens/stores';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: StoresList}
});

const App = createAppContainer(MainNavigator);

export default App;
