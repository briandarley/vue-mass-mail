import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import ConfirmDialog from '../common/dialogs/confirm-dialog';
@Component({
  name: 'information',
  dependencies: ['massMailSearchService', 'userService', 'spinnerService', 'toastService'],
  components: { ConfirmDialog}
})

export default class Information extends Vue {
  massMailInProgress = []
  seletedMassMail = "";

  async onConfirmDelete() {
    await this.massMailSearchService.delete(this.seletedMassMail);
    this.seletedMassMail = "";
    await this.loadCurrentMassMailings();
    this.toastService.success("Successfully removed MassMail");
  }

  onDeclineDelete() {
    
  }

  async deleteMassMail() {
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
  created() {





  }

}

