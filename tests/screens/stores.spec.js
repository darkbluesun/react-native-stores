import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import StoresList from '../../app/screens/stores';

jest.mock('ScrollView', () => require.requireMock('ScrollViewMock'))

describe('screen.stores', function() {
    var navigation, wrapper;
    const storesList = [{id: 1, name: 'first store', branches: []}];
    beforeEach(() => {
        navigation = {
            navigate: jest.fn(),
        };
        wrapper = renderer.create(
            <StoresList
                navigation={navigation}
                getStores={jest.fn()}
                loading={false}
                stores={storesList}
            />
        );
    })
    it('shows loader', () => {
        wrapper = renderer.create(
            <StoresList
                navigation={navigation}
                getStores={jest.fn()}
                loading
                stores={storesList}
            />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    })
    test('renders correctly', function() {
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
    test('navigates to details', () => {
        wrapper.root.findByType('Text').props.onPress();
        expect(navigation.navigate).toHaveBeenCalled();
    })
});
