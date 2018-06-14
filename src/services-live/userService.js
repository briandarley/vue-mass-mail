import injector from 'vue-inject';
import * as Oidc from 'oidc-client';

function userService(configurationReaderService, axios, serviceEndpoint, routerService, localStorageService) {
  return {
    _mgr: null,
    _user: null,
    expireDate: null,
    reviewers: [],

    isInRole(role) {
      
      if (!this._user) {
        return false;
      }
      if (!this._user.profile.role || this._user.profile.role.length === 0) {
        return false;
      }

      let roles = [];
      if (Array.isArray(this._user.profile.role)) {
        roles = this._user.profile.role.map(c => c.toUpperCase());
      } else {
        roles.push(this._user.profile.role.toUpperCase());
      }
      

      if (roles.indexOf(role.toUpperCase()) > -1) {
        return true;
      }

      if (role.toUpperCase() === "ADMIN") {
        //Roles that are available in adtest and ad that represent members of identity management team
        if (roles.indexOf("ITS_IDM USERS") > -1) {
          return true;
        }
        if (roles.indexOf("ITS_IDM_PSX") > -1) {
          return true;
        }
        
      }
      
    },

    async get() {
      
      this._initializeManager();
      
      this._user = await this._mgr.getUser();
      
      
      if (!this._user) {
        localStorageService.set('current-path', routerService.router.history.current.path);
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
        const address = configurationReaderService.get()["security"];
        this._mgr = new Oidc.UserManager(address);


      }
    }
  }

}
injector.service('userService', ['configurationReaderService', 'axios', 'serviceEndpoint', 'routerService','localStorageService'], userService);
