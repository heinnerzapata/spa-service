import Recover from "pages/recover2";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "store";
import { recoverPassword } from "store/user/actions";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onRecoverPassword: (email: string) => dispatch(recoverPassword(email)),
  };
}

const mapStateToProps = (state: IAppState) => ({
  userReducer: state.userReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translation")(Recover));
