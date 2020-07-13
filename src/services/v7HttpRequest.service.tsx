import axios from "axios";
import config from "../config/config";
import store from "../store";
import _ from "lodash";

class V7HttpRequest {
  configRequest: any;
  baseUrl: any;

  constructor() {
    this.configRequest = {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "NhHgv6XxfExoTA8xRU96==",
      },
    };
    this.baseUrl = config.urlEnv;

    this.getToken();
  }

  getToken = () => {
    const token = store.getState().userReducer.token;
    if (!_.isEmpty(token)) {
      this.configRequest.headers.authorization = `bearer ${token}`;
    }
  };

  getConfigRequest() {
    this.getToken();
    return this.configRequest;
  }

  post(data: any, url: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `/${url}`,
          { email: "felipeberm@gmail.com", password: "55555" },
          this.getConfigRequest()
        )
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(Error(error));
        });
    });
  }

  get(url: any) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}/${url}`, this.getConfigRequest())
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(Error(error));
        });
    });
  }
}

export default new V7HttpRequest();
