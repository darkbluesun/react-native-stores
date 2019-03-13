import React from 'react';
import settings from '../config/settings';
import Store from '../components/Store';
import ConfirmModal from '../components/confirm';
import { ActivityIndicator, FlatList, TextInput, Text, View } from 'react-native';

export default class StoreDetail extends React.Component {
  static navigationOptions = {
    title: 'Store details',
  };

  constructor(props){
    super(props);
    this.state = {
      store: {name: props.store.name}
    };
  }

  componentDidMount(){
    this.props.getStore(this.storeId);
  }

  storeId = this.props.navigation.getParam('id', 'NO-ID');

  editName = name => {
    this.setState({store: {name}});
  }

  updateName = e => {
    const name = e.nativeEvent.text;
    fetch(`${settings.apiUrl}stores/${this.storeId}`,
      {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name})
      })
    .then(response => response.json())
    .then(store => this.setState({store}))
  }

  handleClick(item) {
    this.props.navigation.push('StoreDetails', item);
  }

  delete() {
    fetch(`${settings.apiUrl}stores/${this.storeId}`, {method: 'DELETE'})
    .then(() => this.props.navigation.goBack());
  }

  render(){
    if (this.props.loading) {
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      );
    }

    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <TextInput
          onChangeText={name => this.editName(name)}
          onSubmitEditing={name => this.updateName(name)}
          style={{fontSize: 24}}
          value={this.state.store.name}
        />
        <View style={{flexDirection: 'row', height: 30, alignItems: 'stretch'}}>
          <ConfirmModal color='red' label='Delete' title={`Delete ${this.props.store.name}`} handleClick={() => this.delete()} />
        </View>
        <View>
          <Text style={{fontSize: 21}}>Branches</Text>
          <FlatList
            data={this.props.store.branches}
            renderItem={({item}) =>
              <Store
                id={item.id}
                name={item.name}
                branches={item.branches}
                handleClick={item => this.handleClick(item)}
              />}
            keyExtractor={({id}) => id.toString()}
          />
        </View>
      </View>
    )
  }
}
