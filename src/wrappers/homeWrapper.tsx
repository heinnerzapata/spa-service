import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import Home from "pages/home";
import { withTranslation } from "react-i18next";

const mapStateToProps = (state: any) => ({});

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("common")(Home));
