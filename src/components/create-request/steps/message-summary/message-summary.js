import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import DatePicker from '../../../common/datePicker/datePicker';
import PopOver from '../../../common/popover/popover';
import TypeAhead from '../../../common/type-ahead/type-ahead';
import SwitchSlider from '../../../common/switch-slider/switch-slider';
import InputDialog from '../../../common/dialogs/input-dialog';
import PreviewDialog  from '../../../common/dialogs/preview-dialog';
@Component({
  name: '',
  dependencies: ['massMailSearchService', 'userService', 'toastService', 'spinnerService', '$', 'departmentSchoolLookupService', 'eventBus'],
  components: { DatePicker, PopOver, TypeAhead, SwitchSlider, InputDialog, PreviewDialog }

})
export default class MessageSummary extends Vue {
  model = {};
  useDefaultReviewers = false;
  selectedReviewer = "";
  reviewers = [];

  setUseDefaultReviewers(value) {
    this.useDefaultReviewers = value;
  }

  async onAddReviewer(reviewer) {
    await this.userService.addFavoriteReviewer(reviewer);
    await this.initializeFavoriteReviers();
    this.selectedReviewer = "";
  }

  addReviewer() {
    this.$refs.addReviewerDialog.show();
  }

  previewMessage() {
    this.$refs.previewDialog.show();
  }

  async removeReviewer() {
    
    await this.userService.removeFavoriteReviewer(this.selectedReviewer);
    await this.initializeFavoriteReviers();
    this.selectedReviewer = "";
  }
  async initializeFavoriteReviers() {
    this.reviewers = await this.userService.getReviewers();
    
  }

  mounted() {
    this.toastService.set(this);
    this.initializeFavoriteReviers();
    this.model = this.massMailSearchService.model;

  }
}




