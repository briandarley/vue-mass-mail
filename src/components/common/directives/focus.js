import Vue from 'vue';

export default function focus() {
  return {
    update: function(el, binding) {
      
      setTimeout(() => {
        el.focus();
      }, 500);
    
    },
    bind: function(el, binding) {
      
    },
    inserted: function(el, binding) {
      el.focus();
    }
  }
}

Vue.directive('focus', focus());

