import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class Store extends React.Component {
  store = {id: this.props.id, name: this.props.name}

  render() {
    return (
      <View>
        <Text onPress={() => this.props.handleClick(this.store)}>- { this.props.name }</Text>
        <FlatList style={{paddingLeft: 10}}
          data={this.props.branches}
          renderItem={({item}) =>
            <Store
              id={item.id}
              name={item.name}
              branches={item.branches}
              handleClick={item => this.props.handleClick(item)}
            />}
          keyExtractor={({id}, index) => id.toString()}
        />
      </View>
    )
  }
}
