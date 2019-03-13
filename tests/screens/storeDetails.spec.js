import 'isomorphic-fetch';
import React from 'react';
import { TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import StoreDetails from '../../app/screens/storeDetails';
import ConfirmModal from '../../app/components/confirm';
import settings from '../../app/config/settings';
import Store from '../../app/components/Store';

jest.mock('ScrollView', () => require.requireMock('ScrollViewMock'))

describe('screen.store', function() {
    var navigation, wrapper;
    const store = {
        id: 1, 
        name: 'first store', 
        branches: [
            { id: 2, name: 'second store', branches: [] },
        ],
    };
    
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({}));
        navigation = {
            getParam: () => 1,
            push: jest.fn()
        }
        wrapper = renderer.create(
            <StoreDetails
                getStore={jest.fn()}
                store={store}
                loading={false}
                navigation={navigation}
            />
        );
    });
    it('shows loader', () => {
        wrapper = renderer.create(
            <StoreDetails
                getStore={jest.fn()}
                store={store}
                loading
                navigation={navigation}
            />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
    test('renders correctly', function() {
        expect(wrapper.toJSON()).toMatchSnapshot();
        global.fetch.mockClear();
    });
    test('can delete a thing', function(done) {
        process.nextTick(() => {
            wrapper.root.findByType(ConfirmModal).props.handleClick();
            expect(global.fetch).toHaveBeenCalledWith(`${settings.apiUrl}stores/1`, {method: 'DELETE'});
            done();
        });
    });
    test('updates the name', function(done) {
        process.nextTick(() => {
            wrapper.root.findByType(TextInput).props.onSubmitEditing({nativeEvent: {text: 'steve'}});
            expect(global.fetch).toHaveBeenCalledWith(`${settings.apiUrl}stores/1`, {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: '{"name":"steve"}'});
            done();
        });
    });
    test('links to children', function(done) {
        process.nextTick(() => {
            const item = store.branches[0];
            wrapper.root.findByType(Store).props.handleClick(item);
            expect(navigation.push).toHaveBeenCalledWith('StoreDetails', item);
            done();
        });
    });
});
