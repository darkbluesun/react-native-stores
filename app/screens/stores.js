import React from 'react';
import settings from '../config/settings';
import Store from '../components/Store';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class StoresList extends React.Component {
  static navigationOptions = {
    title: 'Stores',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }

  componentDidMount(){
    return fetch(settings.apiUrl + 'stores')
      .then((response) => response.json())
      .then((dataSource) => {

        this.setState({
          isLoading: false,
          dataSource,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Store name={item.name} branches={item.branches} />}
          keyExtractor={({id}, index) => id.toString()}
        />
      </View>
    );
  }
}
