import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Home from "pages/home";
import { withTranslation } from "react-i18next";
import { setToken, setUserInfo } from "store/user/actions";

const mapStateToProps = (state: any) => ({});

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    onSetToken: (newToken: string) => dispatch(setToken(newToken)),
    onSetUserInfo: (newUserInfo: any) => dispatch(setUserInfo(newUserInfo)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("common")(Home));
