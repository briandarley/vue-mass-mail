import Vue from "vue"
import injector from 'vue-inject';
import { Component, Prop, Watch } from "vue-property-decorator";

export default function isAuthor() {
  return {
    inserted: async function (el, binding, vnode) {
      const user = await injector.get('userService').get();
      
      const userId = user.profile.sub;
      

      el.hidden = binding.value.author !== userId;
      
    }
  }
}


Vue.directive('isAuthor', isAuthor());

