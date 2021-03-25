import Machine from 'pages/machine';
import { IAppState } from 'store';
import { ThunkDispatch } from 'redux-thunk';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getDeviceHistory } from 'store/device/actions';

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  onGetDeviceInfo: (machineId: string) => dispatch(getDeviceHistory(machineId)),
});

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
  deviceHistory: state.deviceReducer.deviceHistory,
  deviceSummary: state.deviceReducer.deviceSummary,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('translation')(Machine));
