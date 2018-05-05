<template>
  <div :id="id" class="col-sm-8">
    <input class="typeahead form-control" type="text" :placeholder="placeHolder" :value="val">
    <slot name="info"></slot>
  </div>
</template>
<script>
  import Vue from "vue"
  import { Component, Prop } from "vue-property-decorator"
  import 'typeahead.js/dist/typeahead.bundle.min'
  import 'typeahead.js/dist/bloodhound.min'


  @Component({

    name: 'type-ahead',
    dependencies: ['$'],
    data: function () {
      return {
        
      }
    },
    computed: {
      val: {
        get() { return this.value },
        set(val) {
          this.$emit("change", val);
        }
      }
    },
    watch: {
      selectedDate: function (newVal, oldVal) {
        this.value = newVal;
      }
    }
  })
  export default class TypeAhead extends Vue {
    @Prop() id;
    @Prop() placeHolder;
    @Prop() label;
    @Prop() value;
    @Prop() service;

    
    mounted() {
      const $ = this.$;

      
      $('#' + this.id + ' .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
        {
          name: 'states',
          source: this.service,
          async: true
        })
        .bind('typeahead:select', (ev, suggestion) => {
          this.val = suggestion;
        })
        .bind('typeahead:change', (ev, suggestion) => {
          this.val = suggestion;
        })
        .parent()
        .addClass("col-sm-8")
        .css("padding", "0");

    }

  }

</script>
<style scoped>
</style>
