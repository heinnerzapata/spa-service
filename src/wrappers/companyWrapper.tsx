import Company from "pages/company";
import { IAppState } from "store";
import { ThunkDispatch } from "redux-thunk";
import { connect } from "react-redux";
import { getCompany, upsertCompany } from "store/company/actions";
import { withTranslation } from "react-i18next";

function mapDispatchToProps(dispatch: ThunkDispatch<any, any, any>) {
  return {
    getCompany: (companyId: string) => dispatch(getCompany(companyId)),
    upsertCompany: (company: any, companyId: string) => dispatch(upsertCompany(company, companyId)),
  };
}

const mapStateToProps = (state: IAppState) => ({
  company: state.companyReducer,
  user: state.userReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translation")(Company));
