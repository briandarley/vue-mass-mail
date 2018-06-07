import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import Users from './modules/users.vue';
import Roles from './modules/roles.vue';
import TabbedControl from '../common/tabbed-control/tabbed-control.vue';
import TabbedItem from '../common/tabbed-control/tabbed-item.vue';


@Component({
  name: 'administration',
  dependencies: ['$'],
  components: { Users, Roles, TabbedControl, TabbedItem }
})

export default class Administration extends Vue {

}
