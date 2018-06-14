import Vue from "vue"
import injector from 'vue-inject';
import { Component, Prop, Watch } from "vue-property-decorator";

export default function isApprover() {
  return {
    //isLiteral: true,
    inserted: function (el, binding, vnode) {
      const user = injector.get('userService');
      const model = binding.value;
      if (!model.role) {
        return;
      }
      
      if (user.isInRole(model.role + ' ' + 'approver')) {
        //User is in role
        el.hidden = false;
        return;
      }

      el.hidden = true;
      

    }
  }
}


Vue.directive('isApprover', isApprover());

