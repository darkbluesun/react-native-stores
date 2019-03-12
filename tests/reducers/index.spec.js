import rootReducer from "../../app/reducers";
import { GET_STORE } from "../../app/constants/actiontypes";

describe('root reducer', () => {
  test('should reduce the reducers to one reducer', () => {
    const reducedStore = rootReducer({}, {type: GET_STORE});
    expect(reducedStore).toMatchSnapshot();
  })
})
