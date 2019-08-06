//-----------------------------------------
// A singleton class to manage the token
//-----------------------------------------
class AccessTokenManager {
  setAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }
  getAccessToken() {
    let accessToken = localStorage.getItem('accessToken');

    //Todo: implement logic for setting new token to the localstorage
    // if (new token is required) {
    //   this.setAccessToken(new token)
    // }

    return accessToken;
  }
}

const accessTokenManger = new AccessTokenManager();

export default accessTokenManger;