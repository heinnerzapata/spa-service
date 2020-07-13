import V7HttpRequest from "./v7HttpRequest.service";
import { ICredentials } from "models";

class UserService {
  private static instance: UserService;

  // logInRequest(data: any) {
  //   const urlLogInRequest = `signin`;
  //   return V7HttpRequest.post(data, urlLogInRequest);
  // }

  // signUpRequest(data: any) {
  //   const urlLogInRequest = `signup`;
  //   return V7HttpRequest.post(data, urlLogInRequest);
  // }

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
    // const urlCheckUserToken = `account/${userId}`;

    // Mock service
    // return V7HttpRequest.get(urlCheckUserToken);

    return new Promise((resolve) => {
      setTimeout(() => {
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
        });
      }, 500);
    });

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     reject("error");
    //   }, 1000);
    // });
  }

  logout(email: string) {
    //const logoutUrl = `logout`;

    //return V7HttpRequest.post({ email }, logoutUrl);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      }, 500);
    });
  }

  signup(userInfo: any) {
    //const signUpUrl = `signup`;

    //return V7HttpRequest.post(userInfo, signUpUrl);

    return new Promise((resolve) => {
      setTimeout(() => {
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
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTE0NTk3OTEsImV4cCI6MTU5MTUwMjk5MX0.hoo95VwinUVTD5LYlsJsqTArU069v-gFy_etydi4fm8",
        });
      }, 500);
    });

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({});
    //   }, 500);
    // });
  }

  login(credentials: ICredentials) {
    const loginUrl = `/cmms-gateway-ms/account/sign-in`;

    return V7HttpRequest.post(credentials, loginUrl);

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       account: {
    //         sign_up_date: `2020-06-06T16:09:37.521Z`,
    //         email: `felipeberm@gmail.com`,
    //         display_name: "felipe bermudez",
    //         first_name: "Felipe",
    //         last_name: "Bermudez",
    //         phone_contact: "3165555555",
    //         state: "active",
    //         admin: true,
    //         hex_id: "90dc11c",
    //         avatar:
    //           "http://gravatar.com/avatar/101a805367507a51917217e0320ac7a0?s=200&d=retro",
    //         createdAt: "2020-06-06T16:09:45.997Z",
    //         updatedAt: "2020-06-06T16:09:45.997Z",
    //       },
    //       token:
    //         "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTE0NTk3OTEsImV4cCI6MTU5MTUwMjk5MX0.hoo95VwinUVTD5LYlsJsqTArU069v-gFy_etydi4fm8",
    //     });
    //   }, 500);
    // });

    //return Promise.reject("error");
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
