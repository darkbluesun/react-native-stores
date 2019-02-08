import React from 'react';
import Store from '../../app/components/Store';
import renderer from 'react-test-renderer';
import { FlatList, Text } from 'react-native';

describe('component.Store', function() {
  const store = {id: 12, name: 'Root Store', branches: [{id: 14, name: 'Child Store', branches: []}]};
  const handleClick = jest.fn();
  const wrapper = renderer.create(
    <Store
      id={store.id}
      name={store.name}
      branches={store.branches}
      handleClick={item => handleClick(item)}
    />
  );
  test('renders correctly', function() {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('can be clicked', () => {
    wrapper.root.findByType(Text).props.onPress();
    expect(handleClick).toHaveBeenCalledWith({name: store.name, id: store.id});
  })
  it('has children that can be clicked', () => {
    const item = {id: 44, name: 'Child Store', branches: []};
    var f = wrapper.root.findByType(FlatList).props.renderItem({item});
    f.props.handleClick(item);
    expect(handleClick).toHaveBeenCalledWith(item);
  })
});
