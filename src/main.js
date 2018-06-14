// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import injector from 'vue-inject'
import router from './router'

// app_start will load anything that can be injected into your application
import './app_start';

import Toastr from 'vue-toastr';
require('vue-toastr/src/vue-toastr.scss');


Vue.component('vue-toastr', Toastr);


Vue.config.productionTip = false

// register the injector with Vue
Vue.use(injector);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<div><App v-bind:currentRoute="currentRoute"/><vue-toastr ref="toastr"></vue-toastr></div>',
  data() {
    return {
      currentRoute: "Information"

    }
  },
  created: function() {
    this.currentRoute = router.currentRoute.name;
  },
  watch: {
    $route(to, from) {
      this.currentRoute = to.name;
    }
  },
  mounted() {
    this.$refs.toastr.defaultPosition = 'toast-bottom-right';
    this.$refs.toastr.defaultTimeout = 3000;
  }


});


