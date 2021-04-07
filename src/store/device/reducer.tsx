import { IAction } from './actions';
import { deviceActionType } from './types';

export interface IDeviceState {
  isFetching: boolean;
  error: string | null;
  deviceHistory: any;
  deviceSummary: any;
}

const initState: IDeviceState = {
  isFetching: false,
  error: null,
  deviceHistory: null,
  deviceSummary: null,
};

const deviceReducer = (
  state: IDeviceState = initState,
  action: IAction,
): IDeviceState => {
  switch (action.type) {
    case deviceActionType.GET_DEVICE_HISTORY_STARTED:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case deviceActionType.GET_DEVICE_HISTORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        deviceHistory: action.deviceHistory,
        deviceSummary: action.deviceSummary,
      };
    case deviceActionType.GET_DEVICE_HISTORY_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        deviceHistory: null,
        deviceSummary: null,
      };
    default:
      return state;
  }
};

export default deviceReducer;
