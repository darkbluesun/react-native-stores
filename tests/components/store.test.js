import React from 'react';
import Store from '../../app/components/Store';
import renderer from 'react-test-renderer';

describe('component.Store', function() {
  const store = {id: 12, name: 'Root Store', branches: [{id: 14, name: 'Child Store', branches: []}]};
  const wrapper = renderer.create(
    <Store
      id={store.id}
      name={store.name}
      branches={store.branches}
      handleClick={jest.fn}
    />
  ).toJSON();
  test('renders correctly', function() {
    expect(wrapper).toMatchSnapshot();
  });
});
