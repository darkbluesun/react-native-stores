import reducer from '../../app/reducers/store';
import { 
  GET_STORE,
  GOT_STORE,
  GET_STORE_BRANCHES,
  GOT_STORE_BRANCHES,
  GET_STORE_BRANCHES_FAIL,
  GET_STORE_FAIL,

} from '../../app/constants/actiontypes';

describe('reducer.store', () => {
  test('should GET_STORE', () => {
    expect(reducer(null, {type: GET_STORE})).toMatchSnapshot();
  });
  test('should GOT_STORE', () => {
    const payload = {store: {name: 'new store'}};
    const state = {loading: true, store: {}};
    expect(reducer(state, {type: GOT_STORE, payload})).toMatchSnapshot();
  });
  test('should GET_STORE_FAIL', () => {
    const payload = { error: 'not found' };
    const state = {loading: true, store: {}};
    expect(reducer(state, {type: GET_STORE_FAIL, payload})).toMatchSnapshot();
  });
  test('should GET_STORE_BRANCHES', () => {
    expect(reducer(null, {type: GET_STORE_BRANCHES, payload: { id: 4 }})).toMatchSnapshot();
  });
  test('should GOT_STORE_BRANCHES', () => {
    const state = {loading: true, store: {id: 1, name: 'store 1'}};
    const branches = [{id: 2, name: 'store 2'}];
    const payload = { branches };
    expect(reducer(state, {type: GOT_STORE_BRANCHES, payload})).toMatchSnapshot();
  });
  test('should GET_STORE_BRANCHES_FAIL', () => {
    const state = {loading: true, store: {id: 1, name: 'store 1'}};
    const payload = { error: 'not found' };
    expect(reducer(state, {type: GET_STORE_BRANCHES_FAIL, payload})).toMatchSnapshot();
  });
  test('should have a default', () => {
    const state = {cow: 'horse'};
    expect(reducer(state, {type: 'pony'})).toEqual(state);
  });
});
