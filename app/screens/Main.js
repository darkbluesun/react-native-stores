import React, { Component } from 'react';
import { Provider } from 'react-redux';
import stores from '../reducers/stores';
import { configureStore } from 'redux-starter-kit';
import StoresList from '../containers/stores';


export default class Main extends Component {
  static navigationOptions = {
    title: 'Stores',
  };
  constructor(props){
    super(props);
    this.store = configureStore({
        reducer: { stores }
    });
  }

  render() {
      return (
        <Provider store={this.store}>
          <StoresList navigation={this.props.navigation} />
        </Provider>
      );
  }
}