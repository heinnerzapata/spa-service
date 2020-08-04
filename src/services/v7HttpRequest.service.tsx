import axios from "axios";
import config from "../config/config";
import store from "../store";
import { getToken } from "utilities/token";
import _ from "lodash";

class V7HttpRequest {
  configRequest: any;
  baseUrl: any;

  constructor() {
    this.configRequest = {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_API_KEY,
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
    const va = process.env.REACT_APP_API;
    console.log(va);

    return new Promise((resolve, reject) => {
      axios
        .post(
          `${process.env.REACT_APP_API}${url}`,
          data,
          this.getConfigRequest(false)
        )
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(Error(error));
        });
    });
  }

  get(url: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_API}${url}`, this.getConfigRequest(true))
        .then(function (response) {
          resolve(response.data);
          debugger;
        })
        .catch(function (error) {
          reject(Error(error));
        });
    });
  }
}

export default new V7HttpRequest();
