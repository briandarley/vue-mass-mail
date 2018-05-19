import injector from 'vue-inject';
import * as Oidc from 'oidc-client';

function userService(configurationReaderService, axios, serviceEndpoint) {
  return {
    _mgr: null,
    _user: null,
    expireDate: null,
    reviewers: [],
    async get() {
      
      this._initializeManager();
      
      this._user = await this._mgr.getUser();

      
      if (!this._user) {
        this.login();
      }

      this.expireDate = new Date(this._user.expires_at * 1000);
      
      if (this._user.expires_at < new Date().getTime()/1000) {
        this.logout();
        this.login();
      }
      
      return this._user;

    },
    getReviewers() {
      return new Promise((result, reject) => {
        setTimeout(() => {
            result(this.reviewers);
          },
          1000);
      });
    },
    addFavoriteReviewer(reviewer) {
      return new Promise((result, reject) => {

        console.log("ADD LOGIC TO ADD FAVORITE REVIEWER");
        //this.reviewers.push(reviewer);


        return result();
      });
    },
    removeFavoriteReviewer(reviewer) {
      return new Promise((result, reject) => {

        console.log("ADD LOGIC TO REMOVE FAVORITE REVIEWER");
        //var index = this.reviewers.indexOf(reviewer);
        //this.reviewers.splice(index, 1);

        return result();
      });
    },
    login() {
      this._initializeManager();
      this._mgr.signinRedirect();
    },
    logout() {
      this._initializeManager();
      this._mgr.signoutRedirect();
    },
    _initializeManager() {
      if (!this._mgr) {
        const environment = configurationReaderService.get().environment;
        const address = configurationReaderService.get()["security-" + environment];
        this._mgr = new Oidc.UserManager(address);


      }
    }
  }

}
injector.service('userService', ['configurationReaderService', 'axios','serviceEndpoint'], userService);
