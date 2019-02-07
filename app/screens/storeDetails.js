import React from 'react';
import settings from '../config/settings';
import Store from '../components/Store';
import ConfirmModal from '../components/confirm';
import { ActivityIndicator, FlatList, Text, View, Button  } from 'react-native';

const handleErrors = function(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

export default class StoreDetail extends React.Component {
  static navigationOptions = {
    title: 'Store details',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }

  componentDidMount(){
    const { navigation } = this.props;
    const storeId = navigation.getParam('id', 'NO-ID');
    return fetch(`${settings.apiUrl}stores/${storeId}`)
      .then(handleErrors)
      .then(response => response.json())
      .then(store => {this.setState({store})})
      .then(() => fetch(`${settings.apiUrl}stores/${storeId}/branches`))
      .then(handleErrors)
      .then(response => response.json())
      .then(store => {this.setState({isLoading: false, store})})
      .catch(error => { console.error(error) });
  }

  handleClick(item) {
    this.props.navigation.push('StoreDetails', item);
  }

  delete() {
    const { navigation } = this.props;
    const storeId = navigation.getParam('id', 'NO-ID');
    fetch(`${settings.apiUrl}stores/${storeId}`, {method: 'DELETE'})
    .then(() => this.props.navigation.goBack());
  }

  render(){
    if (this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{fontSize: 24}}>{this.state.store.name}</Text>
        <View style={{flexDirection: 'row', height: 30, alignItems: 'stretch'}}>
          <ConfirmModal color='red' label='Delete' title={`Delete ${this.state.store.name}`} handleClick={() => this.delete()} />
        </View>
        <View>
          <Text style={{fontSize: 21}}>Branches</Text>
          <FlatList
            data={this.state.store.branches}
            renderItem={({item}) =>
              <Store
                id={item.id}
                name={item.name}
                branches={item.branches}
                handleClick={item => this.handleClick(item)}
              />}
            keyExtractor={({id}, index) => id.toString()}
          />
        </View>
      </View>
    )
  }
}
