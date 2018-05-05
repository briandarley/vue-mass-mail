<template>
  <div>
    <label class="switch">
      <input type="checkbox" v-model:checked="defaultValue">
      <span class="slider round"></span>
    </label>
  </div>
</template>
<script>
  import Vue from "vue"
  import { Component, Prop, Watch } from "vue-property-decorator"
  
  @Component({
    name: 'switch-slider',
    dependencies: ['$']
    
  })
  export default class SwitchSlider extends Vue {
    @Prop({ default: false }) enabled;

    get defaultValue() {
      return this.default;
    }
    set defaultValue(value) {
      this.default = value;
      this.$emit("update", value);
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/variables";
  

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 18px;
  }

    /* Hide default HTML checkbox */
    .switch input {
      display: none;
    }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

    .slider:before {
      position: absolute;
      content: "";
      height: 12px;
      width: 12px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

  input:checked + .slider {
    background-color: $green;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px $green;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(23px);
    -ms-transform: translateX(23px);
    transform: translateX(23px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 12px;
  }

    .slider.round:before {
      border-radius: 50%;
    }

</style>

