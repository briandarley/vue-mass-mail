import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import * as Oidc from 'oidc-client';

@Component({
  name: 'call-back',
  dependencies: ['$']
//,components: { ConfirmDialog, CreateRequestNav, MessageDialog}
})

export default class CallBack extends Vue {



  mounted() {
    debugger;
    new Oidc.UserManager().signinRedirectCallback().then(function () {
        window.location = "/information";

      })
      .catch(function (e) {
        debugger;
        console.error(e);
      });

  
  }

}
