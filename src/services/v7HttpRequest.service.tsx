import _ from 'lodash';
import axios from 'axios';
import { getToken } from 'utilities/tokenHelper';
import config from '../config/config';
import store from '../store';

class V7HttpRequest {
  configRequest: any;

  baseUrl: any;

  constructor() {
    this.configRequest = {
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_API_KEY,
      },
    };
    this.baseUrl = config.urlEnv;
  }

  getToken = (isGet: boolean) => {
    const token = isGet ? getToken() : store.getState().userReducer.token;
    if (!_.isEmpty(token)) {
      this.configRequest.headers.authorization = `bearer ${token}`;
    }
  };

  getConfigRequest(isGet: boolean) {
    this.getToken(isGet);

    return this.configRequest;
  }

  post(data: any, url: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.REACT_APP_API}${url}`,
          data,
          this.getConfigRequest(false),
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(Error(error));
        });
    });
  }

  put(data: any, url: string) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${process.env.REACT_APP_API}${url}`,
          data,
          this.getConfigRequest(false),
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(Error(error));
        });
    });
  }

  get(url: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_API}${url}`, this.getConfigRequest(true))
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(Error(error));
        });
    });
  }
}

export default new V7HttpRequest();
