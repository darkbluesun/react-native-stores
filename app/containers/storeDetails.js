import { getStore, gotStore } from "../actions/stores";
import { connect } from 'react-redux';
import storeDetails from '../screens/storeDetails';

const matchStateToProps = (state) => {
    const { store: { loading, store} } = state;
    return { loading, store };
};

const mapDispatchToProps = dispatch => ({
    getStore: () => dispatch(getStore()),
});

export default connect(matchStateToProps, mapDispatchToProps)(storeDetails);
