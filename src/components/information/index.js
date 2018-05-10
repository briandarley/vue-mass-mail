import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import ConfirmDialog from '../common/dialogs/confirm-dialog';
@Component({
  name: 'information',
  dependencies: ['massMailSearchService', 'userService', 'spinnerService', 'toastService','dialogService'],
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
    await this.massMailSearchService.delete(this.seletedMassMail);
    this.seletedMassMail = "";
    await this.loadCurrentMassMailings();
    this.toastService.success("Successfully removed MassMail");
  }

 

  async deleteMassMail() {
    this._initializeConfirmFirstSaveDialog();
    this.$refs.confirmDialog.show();

  }

  async loadCurrentMassMailings() {
    this.spinnerService.show();
    const response = await this.massMailSearchService.getCurrentMassMailByUser(await this.userService.get());
    this.massMailInProgress = response;

    this.spinnerService.hide();
  }

  async editMassMail() {
    
    this.$router.push('/create-request/' + this.seletedMassMail);
  }
  mounted() {
    this.toastService.set(this);
    this.loadCurrentMassMailings();

  }
  created() { }

  createRequest() {
    this.$router.push('/create-request/');
  }

}

