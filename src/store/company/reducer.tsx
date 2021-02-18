import { IAction } from './actions';
import { companyActionType } from './types';

export interface ICompanyState {
  isFetching: boolean;
  company: any;
  error: any;
}

const initState: ICompanyState = {
  isFetching: false,
  error: null,
  company: null,
};

const companyReducer = (
  state: ICompanyState = initState,
  action: IAction,
): ICompanyState => {
  switch (action.type) {
    case companyActionType.GET_COMPANY_STARTED:
      return {
        ...state, isFetching: true, error: false, company: null,
      };
    case companyActionType.GET_COMPANY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        company: action.company,
      };
    case companyActionType.GET_COMPANY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        company: null,
      };
    case companyActionType.UPDATE_COMPANY_STARTED:
      return { ...state, isFetching: true, error: false };
    case companyActionType.UPDATE_COMPANY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: false,
        company: action.company,
      };
    case companyActionType.UPDATE_COMPANY_ERROR:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};

export default companyReducer;
