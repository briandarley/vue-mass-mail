import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import Approvers from './modules/approvers.vue';

@Component({
  name: 'administration',
  dependencies: ['$'],
  components: { Approvers }
})

export default class Administration extends Vue {

}
