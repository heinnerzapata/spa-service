import V7HttpRequest from './v7HttpRequest.service';

class UserService {
  logInRequest(data) {
    const urlLogInRequest = `signin`;
    return V7HttpRequest.post(data, urlLogInRequest);
  }

  signUpRequest(data) {
    const urlLogInRequest = `signup`;
    return V7HttpRequest.post(data, urlLogInRequest);
  }

  recoverPassword(data) {
    const urlRecoverPassword = `account/recover`;
    return V7HttpRequest.post(data, urlRecoverPassword);
  }

  changePassword(token, data) {
    const urlChangePassword = `account/reset/${token}`;
    return V7HttpRequest.post(data, urlChangePassword);
  }

  checkRecoverToken(token) {
    const urlCheckRecoverPassword = `account/reset/${token}`;
    return V7HttpRequest.get(urlCheckRecoverPassword);
  }

  checkUserToken(userId) {
    const urlCheckUserToken = `account/${userId}`;
    return V7HttpRequest.get(urlCheckUserToken);
  }

  editUserAccount(userId, data) {
    const urlEditUserAccount = `account/${userId}`;
    return V7HttpRequest.post(data, urlEditUserAccount);
  }

  getSubscriptionTypes() {
    const urlSubscriptionTypes = `subscriptionTypes`;
    return V7HttpRequest.get(urlSubscriptionTypes);
  }
}

export default new UserService();
