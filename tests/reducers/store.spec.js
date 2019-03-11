import reducer from '../../app/reducers/store';
import { GET_STORE, GOT_STORE } from '../../app/constants/actiontypes';

describe('reducer.store', () => {
  test('should GET_STORE', () => {
    expect(reducer(null, {type: GET_STORE})).toMatchSnapshot();
  });
  test('should GOT_STORE', () => {
    const payload = {store: {name: 'new store'}};
    const state = {loading: true, store: {}};
    expect(reducer(state, {type: GOT_STORE, payload})).toMatchSnapshot();
  });
  test('should have a default', () => {
    const state = {cow: 'horse'};
    expect(reducer(state, {type: 'pony'})).toEqual(state);
  });
});
