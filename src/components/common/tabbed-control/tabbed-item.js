import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
  name: 'tabbed-item',
  dependencies: ['$']
//,components: { ConfirmDialog, CreateRequestNav, MessageDialog}
})

export default class TabbedItem extends Vue {
  @Prop() isActive;

}
