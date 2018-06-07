import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import InputDialog from '../../common/dialogs/input-dialog';
import ConfirmDialog from '../../common/dialogs/confirm-dialog';

@Component({
  name: 'create-request',
  dependencies: ['$', 'administratorService', 'dialogService', 'toastService', 'spinnerService']
  , components: { InputDialog, ConfirmDialog }
})

export default class Roles extends Vue {
  roles = [];

  _initializeConfirmRoleDialog(instance, confirm, title, message, entity) {
    this.dialogService.initialize(instance);
    this.dialogService.title = title;
    this.dialogService.confirmResponse = confirm;
    this.dialogService.message = message;
    this.dialogService.entity = entity;
    //this.dialogService.declineResponse = () => { }
  }

  _initializeAddRoleDialog() {


    this.dialogService.initialize(this.$refs.addRoleDialog);
    this.dialogService.confirmResponse = this.onAddRole.bind(this);
    this.dialogService.declineResponse = () => { }


  }
  async onRemoveRole(entity) {
    await this.administratorService.deleteRole(entity);

    this.spinnerService.show();
    await this.loadRoles();
    this.spinnerService.hide();

    this.toastService.success("Successfully removed role");
  }

  removeRole(id) {
    this._initializeConfirmRoleDialog(this.$refs.confirmDialog, this.onRemoveRole.bind(this), "Remove Role?", "Confirm Remove Role?", id);
    this.dialogService.show();
  }

  async editRole(role) {
    
    role.isEdit = !role.isEdit;
    this.roles = this.roles.slice();

    if (!role.isEdit) {
      this.spinnerService.show();
      await this.administratorService.updateRole(role);
      this.spinnerService.hide();

      this.toastService.success("Successfully updated role");
    }
  }

  addRole() {
    this._initializeAddRoleDialog();
    this.dialogService.show();
  }

  async onAddRole(value) {
    await this.administratorService.addRole(value);


    this.spinnerService.show();
    await this.loadRoles();
    this.spinnerService.hide();

    this.toastService.success("Successfully added new role");

    
  }

  async loadRoles() {
    this.roles = await this.administratorService.getRoles();
  }

  async    mounted() {
    this.toastService.set(this);
    this.spinnerService.show();
    await this.loadRoles();
    this.spinnerService.hide();

  }

}
