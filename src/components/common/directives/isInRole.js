import Vue from "vue"
import injector from 'vue-inject';
import { Component, Prop, Watch } from "vue-property-decorator";

export default function isInRole() {
  return {
    isLiteral: true,
    inserted: function (el, binding, vnode) {
      const user = injector.get('userService');
      const roles = binding.value.split(',');

      let isHidden = true;
      for (let i = 0; i < roles.length; i++) {
        if (user.isInRole(roles[i])) {
          isHidden = false;
          break;
        }
      }
      
      el.hidden = isHidden;
      
      //TODO we may also want to hide if the user is approver but not applicable approver for the target audience?

    }
  }
}


Vue.directive('isInRole', isInRole());

