import { withTranslation } from 'react-i18next';
import { V7Header } from 'components';
import { connect } from 'react-redux';
import { IUserState } from 'store/user/reducer';

import { withRouter } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from 'store';

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

export default connect(
  mapStateToProps, null,
)(withTranslation('translation')(V7Header));
