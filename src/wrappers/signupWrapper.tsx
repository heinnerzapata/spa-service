import SignUp from "pages/signup";
import { withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { IAppState } from "store";
import { ThunkDispatch } from "redux-thunk";
import { loginFromCredentials } from "store/user/actions";
import { ICredentials } from "models";

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});
function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onloginFromCredentials: (credentials: ICredentials) =>
      dispatch(loginFromCredentials(credentials)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translation")(withRouter(SignUp)));
