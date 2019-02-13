import React from 'react';
import { FlatList, Text, View  } from 'react-native';
import PropTypes from 'prop-types';

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
          keyExtractor={({id}) => id.toString()}
        />
      </View>
    )
  }
}

Store.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  handleClick: PropTypes.func,
  branches: PropTypes.array
}
