import VerificationCode from 'pages/verificationCode';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { ThunkDispatch } from 'redux-thunk';
import { signUp } from 'store/user/actions';
import { ICredentials } from 'models';

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  onSignUp: (credentials: ICredentials) => dispatch(signUp(credentials)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation('translation')(withRouter(VerificationCode)));
