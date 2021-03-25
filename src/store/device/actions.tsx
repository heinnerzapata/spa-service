import { Dispatch } from 'redux';
import services from 'services';
import { deviceActionType } from './types';

export interface IGetdeviceHistoryStarted {
  type: deviceActionType.GET_DEVICE_HISTORY_STARTED;
  deviceId: string;
}

export interface IGetdeviceHistorySuccess {
  type: deviceActionType.GET_DEVICE_HISTORY_SUCCESS;
  deviceHistory: any;
  deviceSummary: any;
}

export interface IGetdeviceHistoryError {
  type: deviceActionType.GET_DEVICE_HISTORY_ERROR;
  error: string;
}

export type IAction =
  | IGetdeviceHistoryStarted
  | IGetdeviceHistorySuccess
  | IGetdeviceHistoryError;

export const getDeviceHistoryStarted = (
  deviceId: string,
): IGetdeviceHistoryStarted => ({
  type: deviceActionType.GET_DEVICE_HISTORY_STARTED,
  deviceId,
});

export const getDeviceHistorySuccess = (
  deviceHistory: any,
  deviceSummary: any,
): IGetdeviceHistorySuccess => ({
  type: deviceActionType.GET_DEVICE_HISTORY_SUCCESS,
  deviceHistory,
  deviceSummary,
});

export const getDeviceHistoryError = (
  error: string,
): IGetdeviceHistoryError => ({
  type: deviceActionType.GET_DEVICE_HISTORY_ERROR,
  error,
});

export const getDeviceHistory = (deviceId: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(getDeviceHistoryStarted(deviceId));
  try {
    const result = (await services.device.getDeviceHistory(deviceId)) as any;
    const deviceHistory = result.response.data.device_history;
    const deviceSummary = result.response.data.device_summary;

    if (deviceSummary && deviceHistory) {
      dispatch(getDeviceHistorySuccess(deviceHistory, deviceSummary));
    }

    return await Promise.resolve(result.response.data);
  } catch (error) {
    dispatch(getDeviceHistoryError(error));

    return Promise.reject(error);
  }
};
