import Vue from 'vue';

export default function selectAllOnFocus() {
  return {
    inserted: function (el) {
      el.addEventListener("focus", function() { this.select() });
      console.log("Select all on focus inserted");
      //el.focus();
    }
  }
}

Vue.directive('selectAllOnFocus', selectAllOnFocus());

