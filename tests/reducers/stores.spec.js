import reducer from '../../app/reducers/stores';
import { GET_STORES, GOT_STORES } from '../../app/constants/actiontypes';

describe('reducer.stores', () => {
  test('should GET_STORES', () => {
    expect(reducer(null, {type: GET_STORES})).toMatchSnapshot();
  });
  test('should GOT_STORES', () => {
    const result = reducer(
        {loading: true, stores: []},
        {type: GOT_STORES, payload: {stores: ['store 1']}}
    );
    expect(result).toMatchSnapshot();
  });
  test('should have a default', () => {
    const state = {cow: 'horse'};
    expect(reducer(state, {type: 'pony'})).toEqual(state);
  });
});
