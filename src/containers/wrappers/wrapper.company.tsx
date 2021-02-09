import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import Company from 'pages/company';
import { IAppState } from 'store';
import { getCompany, upsertCompany } from 'store/company/actions';

const mapStateToProps = (state: IAppState) => ({
  company: state.companyReducer,
  user: state.userReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => ({
  getCompany: (companyId: string) => dispatch(getCompany(companyId)),
  upsertCompany: (company: any, companyId: string) => dispatch(upsertCompany(company, companyId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('translation')(Company));
