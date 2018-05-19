import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import ConfirmDialog from '../common/dialogs/confirm-dialog';
@Component({
  name: 'information',
  dependencies: ['massMailSearchService', 'userService', 'spinnerService', 'toastService', 'dialogService','massMailService'],
  components: { ConfirmDialog}
})
export default class Information extends Vue {
  massMailInProgress = []
  seletedMassMail = "";

  _initializeConfirmFirstSaveDialog() {
    this.dialogService.initialize(this.$refs.confirmDialog);
    this.dialogService.title = "Confirm Delete?";
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-warning d-inline-block"><i class="fa fa-exclamation-triangle"></i> </h3>
          <span class="message">Would you like to delete this MassMail?<br/><br/></span></div>`;
    this.dialogService.confirmResponse = this.onConfirmDelete;
  }

  async onConfirmDelete() {
    
    await this.massMailService.delete(this.seletedMassMail);
    this.seletedMassMail = "";
    await this.loadInProgressMessages();
    this.toastService.success("Successfully removed MassMail");
  }

 

  async deleteMassMail() {
    this._initializeConfirmFirstSaveDialog();
    this.$refs.confirmDialog.show();

  }

  async loadInProgressMessages() {
    this.spinnerService.show();
    const response = await this.massMailService.getCurrentMassMailByUser(await this.userService.get());
    this.massMailInProgress = response.data.entities;
    
    this.spinnerService.hide();
  }

  async editMassMail() {
    this.$router.push('/create-request/' + this.seletedMassMail);
  }
  mounted() {
    this.toastService.set(this);
    this.loadInProgressMessages();

  }
  async created() {
    //call get user, this will ensure user is properly authenticated
    await this.userService.get();

  }

  createRequest() {
    this.$router.push('/create-request/');
  }

}

