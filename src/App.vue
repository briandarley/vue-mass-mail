<template>
  <div>
    <div class="container-fluid">

      <div class="header">
        <div class="container">
          <div class="row">

            <div class="offset-9 col-sm-3 login-status">

              <ul class="text-right">
                <li>
                  <a href="javascript:void(0);"  @click="logout">Logout</a>
                </li>
                <li>
                  <span class=""><i class="fa fa-lock mr-1"></i>{{userDisplayName}}</span>
                </li>
              </ul>

            </div>
          </div>
          <div class="site-menu">
            <ul class="row h-100 pt-1">
              <li class="h-100 text-center pt-1">
                <a href="https://selfservice.unc.edu" class="align-middle">Home</a>
              </li>
              <li class="h-100 text-center pt-1 active">
                <a href="javascript:void(0);" class="align-middle">MassMail</a>
              </li>
            </ul>
          </div>

          <div class="top-title">
            <h3>ITS Workgroup Services</h3>
            <h1>Self Service</h1>
            <h5>Active Directory, Exchange, HeelMail, Listserv, MassMail</h5>

          </div>
        </div>

      </div>



    </div>
    <div class="container main-page-component">
      <div style="width: 931px;">
        <div class="container main-content">
          <div class="row">
            <div class="col py-3 sidebar">

              <transition name="fade" v-if="userInitialized">
                <side-nav></side-nav>
              </transition>

            </div>
            <div class="main col-9 py-3">
              <div class="row">
                <div class="col text-primary">
                  <a href="javascript:void(0)" class="pull-right h4" @click="logout">
                    <i class="fa fa-sign-out"></i>
                  </a>

                  <span class="pull-right mr-3"> {{userId}}</span>
                </div>

              </div>
              <div class="row mt-3">
                <div class="col">
                  <transition name="fade">
                    <router-view />
                  </transition>
                </div>
              </div>





              <spinner></spinner>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>










</template>
<script>
  //https://github.com/kaorun343/vue-property-decorator
  import Vue from "vue"
  import { Component, Prop, Watch } from "vue-property-decorator"
  import SideNav from './components/common/nav/side-nav';
  import Spinner from './components/common/spinner/spinner';
  import './components/common/filters';
  @Component({
    name: 'App',
    components: { SideNav, Spinner },
    dependencies: ['$', 'userService','localStorageService']
  })
  export default class App extends Vue {
    userId = '';
    userInitialized = false;
    userDisplayName = '';


    @Watch('$route', { immediate: false })
    onRouteChanged(newValue, oldValue) {
      let $ = this.$;
      //main-content
      //console.log($(".main-content").height());
      //$(".main-content").animate({ height: "auto" }, 3000);
    }
    login() {
      this.userService.login();
    }
    logout() {
      this.userService.logout();
    }
    async mounted() {
      let $ = this.$;
      const user = await this.userService.get();
      this.userId = user.profile.name;
      this.userDisplayName = user.profile.preferred_username;
      this.userInitialized = true;

      const path = this.localStorageService.get('current-path');
      if (path) {
        this.localStorageService.remove('current-path');
        this.$router.push(path);
      }

      
      //console.log($(".main-content").height());
    }
  }



</script>
<style lang="scss">
  @import "assets/scss/variables";

  $fa-font-path: "assets/fonts";
  @import "~font-awesome/scss/font-awesome";
  @import 'bootstrap/scss/bootstrap.scss';
  @import 'assets/scss/style.scss';
  /***********************************************************************************************/
  //Fade Height and Opacity
  //v-enter: Starting state for enter. Added before element is inserted, removed one frame after element is inserted.
  .fade-enter {
    opacity: 0;
  }

  //Active state for enter. Applied during the entire entering phase. Added before element is inserted, removed when transition/animation finishes.
  //This class can be used to define the duration, delay and easing curve for the entering transition.
  .fade-active {
  }

  //Ending state for enter. Added one frame after element is inserted (at the same time v-enter is removed), removed when transition/animation finishes.
  .fade-enter-to {
    transition: opacity 2.15s;
  }

  //Starting state for leave. Added immediately when a leaving transition is triggered, removed after one frame.
  .fade-leave {
    opacity: 1;
  }

  //Active state for leave. Applied during the entire leaving phase. Added immediately when leave transition is triggered, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the leaving transition.
  .fade-active {
    transition: opacity 1.75s;
  }

  //Ending state for leave. Added one frame after a leaving transition is triggered (at the same time v-leave is removed), removed when the transition/animation finishes.
  .fade-leave-to {
    opacity: 0;
  }
  /***********************************************************************************************/
  //Fade Height and Opacity
  //v-enter: Starting state for enter. Added before element is inserted, removed one frame after element is inserted.
  .fade-h-o-enter {
    max-height: 0;
  }

  //Active state for enter. Applied during the entire entering phase. Added before element is inserted, removed when transition/animation finishes.
  //This class can be used to define the duration, delay and easing curve for the entering transition.
  .fade-h-o-active {
    overflow: auto;
  }

  //Ending state for enter. Added one frame after element is inserted (at the same time v-enter is removed), removed when transition/animation finishes.
  .fade-h-o-enter-to {
    max-height: 350px;
    transition: max-height 1.15s ease-in;
    overflow: hidden;
  }

  //Starting state for leave. Added immediately when a leaving transition is triggered, removed after one frame.
  .fade-h-o-leave {
    overflow: hidden;
  }

  //Active state for leave. Applied during the entire leaving phase. Added immediately when leave transition is triggered, removed when the transition/animation finishes. This class can be used to define the duration, delay and easing curve for the leaving transition.
  .fade-h-o-leave-active {
    /*overflow: auto;*/
    max-height: 150px;
    opacity: 1;
    transition: max-height .75s, opacity .75s;
    overflow: hidden;
  }

  //Ending state for leave. Added one frame after a leaving transition is triggered (at the same time v-leave is removed), removed when the transition/animation finishes.
  .fade-h-o-leave-to {
    max-height: 0px;
    opacity: 0;
  }

  span.twitter-typeahead {
    .tt-menu

  {
    @extend .dropdown-menu;
  }

  .tt-suggestion {
    @extend .dropdown-item;
  }

    .tt-suggestion.tt-cursor {
      @extend .dropdown-item.active;
    }

  .input-group & {
    display: flex !important;
    align-items: center;
    position: relative;
    flex: 1 1 auto;
    width: 1%;
    .tt-menu, .tt-hint, .tt-input

  {
    width: 100%;
  }

  }
  }
</style>
