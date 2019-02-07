import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';


class StoresList extends React.Component {
  static navigationOptions = {
    title: 'Stores',
  };

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


const MainNavigator = createStackNavigator({
  Home: {screen: StoresList}
});

const App = createAppContainer(MainNavigator);

export default App;
