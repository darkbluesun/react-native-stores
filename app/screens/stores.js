import React from 'react';
import Store from '../components/Store';
import { FlatList, ActivityIndicator, View  } from 'react-native';

export default class StoresList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.getStores();
  }

  handleClick(item) {
    this.props.navigation.navigate('StoreDetails', item);
  }

  render(){
    if(this.props.loading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
  

    return(
      <View>
        <FlatList
          data={this.props.stores}
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
