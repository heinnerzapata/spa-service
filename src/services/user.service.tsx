import V7HttpRequest from "./v7HttpRequest.service";

class UserService {
  private static instance: UserService;

  logInRequest(data: any) {
    const urlLogInRequest = `signin`;
    return V7HttpRequest.post(data, urlLogInRequest);
  }

  signUpRequest(data: any) {
    const urlLogInRequest = `signup`;
    return V7HttpRequest.post(data, urlLogInRequest);
  }

  recoverPassword(data: any) {
    const urlRecoverPassword = `account/recover`;
    return V7HttpRequest.post(data, urlRecoverPassword);
  }

  changePassword(token: any, data: any) {
    const urlChangePassword = `account/reset/${token}`;
    return V7HttpRequest.post(data, urlChangePassword);
  }

  checkRecoverToken(token: any) {
    const urlCheckRecoverPassword = `account/reset/${token}`;
    return V7HttpRequest.get(urlCheckRecoverPassword);
  }

  checkUserToken(userId: any) {
    const urlCheckUserToken = `account/${userId}`;

    // Mock service
    // return V7HttpRequest.get(urlCheckUserToken);

    return new Promise((resolve) =>
      resolve({
        account: {
          sign_up_date: `2020-06-06T16:09:37.521Z`,
          email: `felipeberm@gmail.com`,
          display_name: "felipe bermudez",
          first_name: "Felipe",
          last_name: "Bermudez",
          phone_contact: "3165555555",
          state: "active",
          admin: true,
          hex_id: "90dc11c",
          avatar:
            "http://gravatar.com/avatar/101a805367507a51917217e0320ac7a0?s=200&d=retro",
          createdAt: "2020-06-06T16:09:45.997Z",
          updatedAt: "2020-06-06T16:09:45.997Z",
        },
      })
    );

    //return new Promise((reject) => reject('error'))
  }

  editUserAccount(userId: any, data: any) {
    const urlEditUserAccount = `account/${userId}`;
    return V7HttpRequest.post(data, urlEditUserAccount);
  }

  getSubscriptionTypes() {
    const urlSubscriptionTypes = `subscriptionTypes`;
    return V7HttpRequest.get(urlSubscriptionTypes);
  }
}

export default new UserService();
