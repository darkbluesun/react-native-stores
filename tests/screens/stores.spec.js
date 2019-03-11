import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import StoresList from '../../app/screens/stores';

jest.mock('ScrollView', () => require.requireMock('ScrollViewMock'))

describe('screen.stores', function() {
    var navigation, wrapper;
    const storesList = [{id: 1, name: 'first store', branches: []}];
    const mockPromise = Promise.resolve({
        ok: true,
        json: () => storesList
    })
    jest.spyOn(global, 'fetch').mockImplementation(() => mockPromise);
    beforeEach(() => {
        navigation = {
            navigate: jest.fn(),
        };
        wrapper = renderer.create(
            <StoresList
                navigation={navigation}
                getStores={jest.fn()}
                gotStores={jest.fn()}
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
                gotStores={jest.fn()}
                loading
                stores={storesList}
            />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    })
    test('renders correctly', function(done) {
        process.nextTick(() => {
            expect(wrapper.toJSON()).toMatchSnapshot();
            global.fetch.mockClear();
            done();
        });
    });
    test('navigates to details', (done) => {
        process.nextTick(() => {
            wrapper.root.findByType('Text').props.onPress();
            expect(navigation.navigate).toHaveBeenCalled();
            done();
        });
    })
});
