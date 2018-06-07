import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import TabbedItem from './tabbed-item.vue';



@Component({
  name: 'create-request',
  dependencies: ['$']
  , components: { TabbedItem }
})

export default class TabbedControl extends Vue {
  @Prop() tabs;
  items = [];

  @Watch('tabs', { immediate: true })
  onTabValueChanged(newValue, oldValue) {
    this.items = newValue.split(',').map((c,index) => { return { active: false, label: c, index:index } });
    this.items[0].active = true;
  }

  tabChanged(index) {
    this.items = this.items.map(c => {
      c.active = false;
      return c;
    });
    const item = this.items.find(c => c.index === index);
    item.active = true;
  }

  mounted() {
    
  }
}
