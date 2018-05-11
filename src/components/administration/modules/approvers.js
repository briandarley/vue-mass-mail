import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import AdminUserDialog from "../../common/dialogs/admin-user-dialog";
@Component({
  name: 'approvers',
  dependencies: ['$', 'departmentLookupService','spinnerService'],
  components: { AdminUserDialog }
})

export default class Approvers extends Vue {

  
  addUser() {
    this.$refs.adminUserDialog.show();
  }
  async mounted() {
    this.spinnerService.show();
    const departments = await this.departmentLookupService.get();
    this.spinnerService.hide();
    
  }
}
