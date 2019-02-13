import React from 'react';
import settings from '../config/settings';
import Store from '../components/Store';
import { FlatList, ActivityIndicator, View  } from 'react-native';

const handleErrors = function(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

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
      .then(handleErrors)
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

  handleClick(item) {
    this.props.navigation.navigate('StoreDetails', item);
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
    );
  }
}
