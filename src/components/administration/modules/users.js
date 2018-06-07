import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import AdminUserDialog from "../../common/dialogs/admin-user-dialog";
import ConfirmDialog from '../../common/dialogs/confirm-dialog';

@Component({
  name: 'users',
  dependencies: ['$', 'departmentLookupService', 'spinnerService', 'dialogService','administratorService'],
  components: { AdminUserDialog, ConfirmDialog }
})

export default class Users extends Vue {
  users = [];

  _initializeAdminUserDialog(instance, entity) {
    this.dialogService.initialize(instance);
    this.dialogService.confirmResponse = this.loadUsers;
    this.dialogService.declineResponse = () => { };
    this.dialogService.entity = entity;
  }
  _initializeConfirmRoleDialog(instance, confirm, title, message, entity) {
    this.dialogService.initialize(instance);
    this.dialogService.title = title;
    this.dialogService.confirmResponse = confirm;
    this.dialogService.message = message;
    this.dialogService.entity = entity;
  }



  editUser(user) {
    this._initializeAdminUserDialog(this.$refs.adminUserDialog, user);
    this.dialogService.show();
  }

  async onDelete(user) {
    this.spinnerService.show();
    await this.administratorService.deleteUser(user.id);
    this.loadUsers();
    this.spinnerService.hide();
  }

  deleteUser(user) {
    
    const confirmMessage = `Are you sure you want to delete user ${user.name}?`;
    this._initializeConfirmRoleDialog(this.$refs.confirmDialog, this.onDelete.bind(this), "Confirm Delete User?", confirmMessage,user);
    this.dialogService.show();

  }
  
  addUser() {
    this._initializeAdminUserDialog(this.$refs.adminUserDialog);

    this.dialogService.show();
  }

  async loadUsers() {
    this.spinnerService.show();

    const users = await this.administratorService.getUsers();
    
    this.users = users.map(c => {
      return {
        id: c.id,
        name: c.onyen,
        roles: c.roles.map(d => d.name).join(",")
      }
    });

    this.spinnerService.hide();
  }

  async mounted() {
    this.spinnerService.show();
    const departments = await this.departmentLookupService.get();


    await this.loadUsers();


    this.spinnerService.hide();
  }
}
