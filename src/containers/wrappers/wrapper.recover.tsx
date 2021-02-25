import Recover from 'pages/recover';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from 'store';
import {
  checkRecoverHash,
  restorePassword,
  recoverPassword,
} from 'store/user/actions';

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  onCheckRecoverHash: (hash: string) => dispatch(checkRecoverHash(hash)),
  onRestorePassword: (password: string, hash: string) =>
    dispatch(restorePassword(password, hash)),
  onRecoverPassword: (email: string) => dispatch(recoverPassword(email)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('translation')(withRouter(Recover)));
