import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class StoresList extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true }
  }

  componentDidMount(){
    return fetch('http://0.0.0.0:8000/api/stores')
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
      <View style={{flex: 1, flexDirection: 'column', paddingTop: 20}}>
        <Text style={{fontSize: 24}}>Stores:</Text>
        <View style={{paddingTop:20}}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) => <Store name={item.name} branches={item.branches} />}
            keyExtractor={({id}, index) => id.toString()}
          />
        </View>
      </View>
    );
  }
}

class Store extends React.Component {
  render() {
    return (
      <View>
        <Text>- { this.props.name }</Text>
        <FlatList style={{paddingLeft: 10}}
          data={this.props.branches}
          renderItem={({item}) => <Store name={item.name} branches={item.branches} />}
          keyExtractor={({id}, index) => id.toString()}
        />
      </View>
    )
  }
}
