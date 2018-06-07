import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import DatePicker from '../../../common/datePicker/datePicker';
import PopOver from '../../../common/popover/popover';
import TypeAhead from '../../../common/type-ahead/type-ahead';
import SwitchSlider from '../../../common/switch-slider/switch-slider';
import InputDialog from '../../../common/dialogs/input-dialog';
import PreviewDialog from '../../../common/dialogs/preview-dialog';
import ConfirmDialog from '../../../common/dialogs/confirm-dialog.vue';
@Component({
  name: '',
  dependencies: ['massMailService', 'userService', 'toastService', 'spinnerService', '$', 'departmentSchoolLookupService', 'eventBus', 'favoriteReviewerService', 'dialogService', 'validationServices', 'sendMessageService'],
  components: { DatePicker, PopOver, TypeAhead, SwitchSlider, InputDialog, PreviewDialog, ConfirmDialog }

})
export default class MessageSummary extends Vue {
  model = {};
  useDefaultReviewers = false;
  selectedReviewer = "";
  singleTestRecipient = "";
  reviewers = [];

  setUseDefaultReviewers(value) {
    this.useDefaultReviewers = value;
  }

  async onAddReviewer(reviewer) {

    if (this.reviewers.map(c => c.toUpperCase()).indexOf(reviewer.toUpperCase()) > -1) {
      this.toastService.warn("Value must be unique");
      return;
    }

    try {
      await this.favoriteReviewerService.addReviewer(reviewer);

      this.reviewers.push(reviewer);

      this.selectedReviewer = "";
    } catch (e) {
      this.toastService.error(e);
    }
  }


  addReviewer() {
    this.$refs.addReviewerDialog.show();
  }

  previewMessage() {
    this.$refs.previewDialog.show();
  }

  async removeReviewer() {

    await this.favoriteReviewerService.deleteReviewer(this.selectedReviewer);

    const index = this.reviewers.indexOf(this.selectedReviewer);

    this.reviewers.splice(index, 1);

    this.selectedReviewer = "";
  }
  async initializeFavoriteReviers() {
    this.reviewers = await this.favoriteReviewerService.getReviewers();

  }

  _getTestRecipients() {
    const result = [];
    if (this.singleTestRecipient) {
      result.push(this.singleTestRecipient);
    }

    if (this.useDefaultReviewers) {
      for (let i = 0; i < this.reviewers.length; i++) {
        result.push(this.reviewers[i]);
      }
    }

    return result;
  }

  _initializeConfirmSendTestMsgDialog() {
    let recipients = '<ul>';


    this._getTestRecipients().forEach(recipient => {
      recipients += `<li>${recipient}</li>`;
    });

    recipients += '</ul>';

    this.dialogService.initialize(this.$refs.confirmSendTestMsgDialog);
    this.dialogService.title = "Confirm Send Test Message?";
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-success d-inline-block"><i class="fa fa-exclamation-circle"></i> </h3>
          <div class="message">
            <p>Send Test Message to the following individuals?</p>
            ${recipients}
          </div>`;
    this.dialogService.confirmResponse = this.onSendTestMessage;



  }


  getAudienceCriteria() {
    let response = this.model.targetPopulation;

    switch (response) {
      case "EMPLOYEES":
        response = "Employees";
        break;
      case "STUDENTS":
        response = "Students";
        break;
      case "EMPLOYEES_STUDENTS":
        response = "Employees";
        break;
      case "TESTING_ONLY":
        response = "Testing Only";
        break;

    }




    if (this.model.targetEmployee) {
      response += `, <br/><span class='font-weight-bold'>Employee Criteria ${this.model.targetEmployee}</span>`;
    }

    return response;
  }

  onSendTestMessage() {


    this.sendMessageService.send(this.model.id, this._getTestRecipients());
    this.toastService.success("Successfully Submitted Test Email");
  }

  sendTestMessage() {
    if (this.singleTestRecipient) {
      if (!this.validationServices.validateEmail(this.singleTestRecipient)) {
        this.toastService.error("Invalid Email Address");
        return;
      }
    }
    this._initializeConfirmSendTestMsgDialog();
    this.dialogService.show();
  }
  //
  mounted() {
    this.toastService.set(this);
    this.initializeFavoriteReviers();

    this.model = this.massMailService.model;

  }

}




