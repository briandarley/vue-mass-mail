import Vue from 'vue';

export default function focus() {
  return {
    inserted: function(el) {
      el.focus();
    }
  }
}

Vue.directive('focus', focus());

