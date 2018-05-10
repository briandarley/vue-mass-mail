<template>
  <div class="container main-content">
    <div class="row">
      <div class="col py-3 sidebar">
        <side-nav></side-nav>
      </div>
      <div class="main col-9 py-3">

        <transition name="fade">
          <router-view />
        </transition>
        <spinner></spinner>
      </div>
    </div>

    <!--<div class="row">
      <div class="col-12 py-3 bg-danger">
        Footer
      </div>
    </div>-->
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
    dependencies: ['$']
  })
  export default class App extends Vue {


    @Watch('$route', { immediate: false })
    onRouteChanged(newValue, oldValue) {
      let $ = this.$;
      //main-content
      //console.log($(".main-content").height());
      //$(".main-content").animate({ height: "auto" }, 3000);
    }

    mounted() {
      let $ = this.$;
      //console.log($(".main-content").height());
    }

  }
</script>
<style lang="scss">
  @import "assets/scss/variables";

  $fa-font-path: "assets/fonts";
  /*$fa-font-path: "~font-awesome/fonts";*/
  @import "~font-awesome/scss/font-awesome";
  @import 'bootstrap/scss/bootstrap.scss';




  html, body {
    height: 100%; /*font-size: .9em;*/
  }

  .main-content {
    background-color: $gray-100;
    border: 1px dashed $carolina-blue;
  }

  ::placeholder {
    opacity: .4 !important;
  }

  .main {
    width: auto;
  }

  .sidebar {
    border-right: 1px dashed $carolina-blue;
  }



  select.form-control, input[type="text"] {
    display: inline-block;
  }


  .btn-label {
    position: relative;
    left: -12px;
    display: inline-block;
    padding: 6px 12px;
    background: rgba(0,0,0,0.15);
    border-radius: 3px 0 0 3px;
  }

  .btn-sm .btn-label {
    padding: 3px 8px;
    left: -8px;
  }

  .btn-labeled {
    padding-top: 0;
    padding-bottom: 0;
  }

    .btn-labeled.btn {
      margin-bottom: 10px;
    }

  .validation-error h3{
    font-size: 5em;
    opacity: .3;
    position: absolute;
    top: 0px;
    left: 40px;
  }
  .validation-error .message{
    display:block;
    margin-left:120px;
  }
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
