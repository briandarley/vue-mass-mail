<template>
  <div class="spinner" v-if="processing">
    <div class="spinner-container">
      <div class="fulfilling-bouncing-circle-spinner">
        <div class="circle"></div>
        <div class="orbit"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"


@
Component({
  name: 'spinner',
  dependencies: ['spinnerService'],
  data: function() {
    return {
      processing:false
    }
  }

})
export default class Spinner extends Vue{
  

  showSpinner() {
    this.processing = true;
  }
  hideSpinner() {
    this.processing = false;
  }
  toggleSpinner() {
    this.processing = !this.processing;
  }

  created() {
    this.spinnerService.onToggleSpinner = this.toggleSpinner;
    this.spinnerService.onHideSpinner = this.hideSpinner;
    this.spinnerService.onShowSpinner = this.showSpinner;

  }


}
</script>
<style>
    #outer-wrapper {
      display: table;
      position: relative;
  }
  .spinner {
      position: absolute;
      background-color: rgba(175, 202, 226, 0.35);
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      z-index: 101;
  }

  .spinner-container {
      margin-top: 150px;
  }


  .fulfilling-bouncing-circle-spinner, .fulfilling-bouncing-circle-spinner * {
      box-sizing: border-box;
  }

  .fulfilling-bouncing-circle-spinner {
      margin-right: auto;
      margin-left: auto;
      height: 60px;
      width: 60px;
      position: relative;
      animation: fulfilling-bouncing-circle-spinner-animation infinite 4000ms ease;
  }

      .fulfilling-bouncing-circle-spinner .orbit {
          height: 60px;
          width: 60px;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          border: calc(60px * 0.03) solid #4B9CD3;
          animation: fulfilling-bouncing-circle-spinner-orbit-animation infinite 4000ms ease;
      }

      .fulfilling-bouncing-circle-spinner .circle {
          height: 60px;
          width: 60px;
          color: #4B9CD3;
          display: block;
          border-radius: 50%;
          position: relative;
          border: calc(60px * 0.1) solid #4B9CD3;
          animation: fulfilling-bouncing-circle-spinner-circle-animation infinite 4000ms ease;
          transform: rotate(0deg) scale(1);
      }

  @keyframes fulfilling-bouncing-circle-spinner-animation {
      0% {
          transform: rotate(0deg);
      }

      100% {
          transform: rotate(360deg);
      }
  }

  @keyframes fulfilling-bouncing-circle-spinner-orbit-animation {
      0% {
          transform: scale(1);
      }

      50% {
          transform: scale(1);
      }

      62.5% {
          transform: scale(0.8);
      }

      75% {
          transform: scale(1);
      }

      87.5% {
          transform: scale(0.8);
      }

      100% {
          transform: scale(1);
      }
  }

  @keyframes fulfilling-bouncing-circle-spinner-circle-animation {
      0% {
          transform: scale(1);
          border-color: transparent;
          border-top-color: inherit;
      }

      16.7% {
          border-color: transparent;
          border-top-color: initial;
          border-right-color: initial;
      }

      33.4% {
          border-color: transparent;
          border-top-color: inherit;
          border-right-color: inherit;
          border-bottom-color: inherit;
      }

      50% {
          border-color: inherit;
          transform: scale(1);
      }

      62.5% {
          border-color: inherit;
          transform: scale(1.4);
      }

      75% {
          border-color: inherit;
          transform: scale(1);
          opacity: 1;
      }

      87.5% {
          border-color: inherit;
          transform: scale(1.4);
      }

      100% {
          border-color: transparent;
          border-top-color: inherit;
          transform: scale(1);
      }
  }


</style>
