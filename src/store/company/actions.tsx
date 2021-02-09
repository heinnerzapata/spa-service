import { Dispatch } from 'redux';
import services from 'services';
import { companyActionType } from './types';

export interface IGetCompanyStarted {
  type: companyActionType.GET_COMPANY_STARTED;
}

export interface IGetCompanySuccess {
  type: companyActionType.GET_COMPANY_SUCCESS;
  company: any;
}

export interface IGetCompanyError {
  type: companyActionType.GET_COMPANY_ERROR;
  error: any;
}

export interface IUpdateCompanyStarted {
  type: companyActionType.UPDATE_COMPANY_STARTED;
}

export interface IUpdateCompanySuccess {
  type: companyActionType.UPDATE_COMPANY_SUCCESS;
  company: any;
}

export interface IUpdateCompanyError {
  type: companyActionType.UPDATE_COMPANY_ERROR;
  error: any;
}

export interface IClearCompany {
  type: companyActionType.CLEAR_COMPANY;
}

export type IAction =
  | IGetCompanyStarted
  | IGetCompanySuccess
  | IGetCompanyError
  | IUpdateCompanyStarted
  | IUpdateCompanySuccess
  | IClearCompany
  | IUpdateCompanyError;

export const getCompanyStarted = (): IGetCompanyStarted => ({
  type: companyActionType.GET_COMPANY_STARTED,
});

export const updateCompanyStarted = (): IUpdateCompanyStarted => ({
  type: companyActionType.UPDATE_COMPANY_STARTED,
});

export const getCompanySuccess = (company: any): IGetCompanySuccess => ({
  type: companyActionType.GET_COMPANY_SUCCESS,
  company,
});

export const updateCompanySuccess = (company: any): IUpdateCompanySuccess => ({
  type: companyActionType.UPDATE_COMPANY_SUCCESS,
  company,
});

export const getCompanyError = (error: string): IGetCompanyError => ({
  type: companyActionType.GET_COMPANY_ERROR,
  error,
});

export const clearCompany = (): IClearCompany => ({
  type: companyActionType.CLEAR_COMPANY,
});

export const updateCompanyError = (error: string): IUpdateCompanyError => ({
  type: companyActionType.UPDATE_COMPANY_ERROR,
  error,
});

export const getCompany = (companyId: string) => async (dispatch: Dispatch) => {
  dispatch(getCompanyStarted());
  try {
    const result = (await services.company.getCompany(companyId)) as any;
    const { company } = result.response.data;
    dispatch(getCompanySuccess(company));

    return await Promise.resolve();
  } catch (error) {
    dispatch(getCompanyError(error));

    return Promise.reject(error);
  }
};

export const upsertCompany = (company: any, companyId: string) => async (dispatch: Dispatch) => {
  dispatch(updateCompanyStarted());
  try {
    const result = (await services.company.updateCompany(
      company,
      companyId,
    )) as any;
    const companyResult = result.response.data.company;
    dispatch(updateCompanySuccess(companyResult));

    return await Promise.resolve(result);
  } catch (error) {
    dispatch(updateCompanyError(error));

    return Promise.reject(error);
  }
};
