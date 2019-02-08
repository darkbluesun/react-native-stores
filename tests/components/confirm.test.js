import React from 'react';
import ConfirmModal from '../../app/components/confirm';
import renderer from 'react-test-renderer';
import { Modal, Text, View, Button } from 'react-native';

describe('component.ConfirmModal', function() {
  const handleClick = jest.fn().mockResolvedValue({})
  const store = {id: 12, name: 'Root Store', branches: [{id: 14, name: 'Child Store', branches: []}]};
  const wrapper = renderer.create(
    <ConfirmModal
      color='red'
      label='Delete'
      title={`Delete Something`}
      handleClick={handleClick}
    />
  );
  test('renders correctly', function() {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  test('can open modal', () => {
    expect(wrapper.root.findByType(Modal).props.visible).toEqual(false);
    wrapper.root.findAllByType(Button)[0].props.onPress();
    expect(wrapper.root.findByType(Modal).props.visible).toEqual(true);
  });
  test('can close modal', () => {
    wrapper.root.findAllByType(Button)[0].props.onPress();
    expect(wrapper.root.findByType(Modal).props.visible).toEqual(true);
    wrapper.root.findByType(Modal).props.onRequestClose();
    expect(wrapper.root.findByType(Modal).props.visible).toEqual(false);
  });
  test('can cancel modal', () => {
    wrapper.root.findAllByType(Button)[0].props.onPress();
    expect(wrapper.root.findByType(Modal).props.visible).toEqual(true);
    wrapper.root.findByType(Modal).findByProps({title: "No, don't"}).props.onPress();
    expect(wrapper.root.findByType(Modal).props.visible).toEqual(false);
  });
  test('can submit modal', async () => {
    wrapper.root.findAllByType(Button)[0].props.onPress();
    expect(wrapper.root.findByType(Modal).props.visible).toEqual(true);
    await wrapper.root.findByType(Modal).findByProps({title: "Delete"}).props.onPress();
    expect(handleClick).toHaveBeenCalled();
    expect(wrapper.root.findByType(Modal).props.visible).toEqual(false);
  });
});
