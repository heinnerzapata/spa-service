import { IAppState } from 'store';
import Profile from 'pages/profile';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { updateUser } from 'store/user/actions';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  updateUser: (newUserInfo: any, hexId: string) => dispatch(updateUser(newUserInfo, hexId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('translation')(withRouter(Profile)));
