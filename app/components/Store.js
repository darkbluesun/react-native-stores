import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class Store extends React.Component {
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
