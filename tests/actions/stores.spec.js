import {
  getStores,
  gotStores,
  getStore,
  gotStore
} from '../../app/actions/stores';

describe('actions.stores', () => {
  test('should generate GET_STORES', () => {
    expect(getStores()).toMatchSnapshot();
  });
  test('should generate GOT_STOERS', () => {
    expect(gotStores([{name: 'store 1'}])).toMatchSnapshot();
  });
  test('should generate GET_STORE', () => {
    expect(getStore()).toMatchSnapshot();
  });
  test('should generate GOT_STORE', () => {
    expect(gotStore({name: 'store 1'})).toMatchSnapshot();
  });
});
