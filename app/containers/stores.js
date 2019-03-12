import { getStores } from "../actions/stores";
import { connect } from 'react-redux';
import StoresList from '../screens/stores';

const matchStateToProps = (state) => {
    const { stores: { loading, stores} } = state;
    return { loading, stores };
};

const mapDispatchToProps = dispatch => ({
    getStores: () => dispatch(getStores()),
});

export default connect(matchStateToProps, mapDispatchToProps)(StoresList);
