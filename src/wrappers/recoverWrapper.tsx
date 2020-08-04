import Recover from "pages/recover2";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "store";
import { checkRecoverHash } from "store/user/actions";
import { restorePassword } from "store/user/actions";
import { recoverPassword } from "store/user/actions";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onCheckRecoverHash: (email: string) => dispatch(checkRecoverHash(email)),
    onRestorePassword: (password: string, hash: string) =>
      dispatch(restorePassword(password, hash)),
    onRecoverPassword: (email: string) => dispatch(recoverPassword(email)),
  };
}

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translation")(withRouter(Recover)));
