import axios from 'axios';
import config from './../config/config';
import store from '../store';
import _ from 'lodash';

class V7HttpRequest {
  constructor() {

    this.configRequest = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      }
    };
    this.baseUrl = config.urlEnv;

    this.getToken();
  }

  getToken = () => {
    const token = store.getState().userReducer.token;
    if(!_.isEmpty(token)) {
      this.configRequest.headers.authorization = `bearer ${token}`;
    }
  }

  getConfigRequest() {
    this.getToken();
    return this.configRequest;
  }

  post(data, url) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/${url}`, data , this.getConfigRequest())
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(Error(error));
        });
    })
  }

  get(url) {
    return new Promise((resolve, reject) => {
      axios
      .get(`${this.baseUrl}/${url}`, this.getConfigRequest())
        .then(function(response) {
          resolve(response.data);
        })
        .catch(function(error) {
          reject(Error(error));
        });
    })
  }
}

export default new V7HttpRequest();
