import Vue from "vue"
import injector from 'vue-inject';
import { Component, Prop, Watch } from "vue-property-decorator";

export default function isStatus() {
  return {
    
    inserted: function (el, binding, vnode) {
      el.hidden = false;
      const bindingModel = binding.value;

      let isHidden = !(bindingModel.record.targetPopulation === "EMPLOYEES_STUDENTS" || bindingModel.record.targetPopulation === bindingModel.population);

      isHidden = isHidden || (bindingModel.record.status !== bindingModel.status);
      
      el.hidden = isHidden ;

      
    }
  }
}


Vue.directive('isStatus', isStatus());

