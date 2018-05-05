<template>
  <div class="d-inline-block">

    <a href="javascript:void(0)"
       tabindex="-1"
       data-toggle="popover"
       v-bind:title="title"
       data-trigger="focus"
       v-bind:data-content="dataContent">
      <i class="fa fa-info-circle"></i> {{linkText}}
    </a>


  </div>
</template>
<script>
  import Vue from "vue"
  import { Component, Prop } from "vue-property-decorator"

  @Component({

    name: 'pop-over',
    dependencies: ['$'],
    data: function () {
      return {
        value: ""
      }
    },


  })
  export default class PopOver extends Vue {
    @Prop() title;
    @Prop() dataContent;
    @Prop() linkText;

    mounted() {
      var $ = this.$;

      this.$('[data-toggle="popover"]').popover(); 

    }

  }
</script>
<style scoped>

</style>
