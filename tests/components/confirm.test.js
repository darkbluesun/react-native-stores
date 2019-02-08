import React from 'react';
import ConfirmModal from '../../app/components/confirm';
import renderer from 'react-test-renderer';


describe('component.ConfirmModal', function() {
  const store = {id: 12, name: 'Root Store', branches: [{id: 14, name: 'Child Store', branches: []}]};
  const wrapper = renderer.create(
    <ConfirmModal
      color='red'
      label='Delete'
      title={`Delete Something`}
      handleClick={jest.fn}
    />
  ).toJSON();
  test('renders correctly', function() {
    expect(wrapper).toMatchSnapshot();
  });
});
