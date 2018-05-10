import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import SearchForm from './modules/search-form.vue';
import Pagination from './modules/pagination.vue';
import ConfirmDialog from '../common/dialogs/confirm-dialog.vue';
import SendMessageDialog from '../common/dialogs/send-message-dialog.vue';
import numeral from 'numeral';
@Component({
  name: 'view-request',
  components: { SearchForm, Pagination, ConfirmDialog, SendMessageDialog },
  dependencies: ['$', 'massMailSearchService', 'userService', 'spinnerService', 'toastService', 'dialogService','sendMessageService'],
  filters: {
    formatNumber: (value) => {
      return numeral(value).format("0,0");
    }
  }
})

export default class ViewRequest extends Vue {
  records = [];
  status = "Needs Review";
  pageIndex = 0;
  pageSize = 10;
  totalRecords = 0;
  
  pagingHandler = {
    navigate: this.onPageIndexChanged
  }
  searchHandler = {
    search: this.onFilter
  }
  _pageIndexFunc
  onPageIndexChanged(index) {
    this.pageIndex = index;

    clearTimeout(this._pageIndexFunc);
    this._pageIndexFunc = setTimeout(async () => {

      this.spinnerService.show();
      const criteria = {
        pageSize: this.pageSize,
        index: this.pageIndex,
        status: this.status
      };

      const request = await this.massMailSearchService.getRecords(criteria);
      this.records = request.records;
      this.spinnerService.hide();
    }, 100);
  }

  async onFilter(text, status) {
    
    if (!status) {
      status = "Needs Review";
    }
    this.status = status;

    this.pageIndex = 0;
    
    const criteria = {
      pageSize: this.pageSize,
      index: this.pageIndex,
      textFilter: text,
      status: status
    };

    const request = await this.massMailSearchService.getRecords(criteria);
    this.records = request.records;
    this.totalRecords = request.totalRecords;


  }
  async loadData() {
    this.toastService.set(this);
    this.spinnerService.show();

    const criteria = {
      pageSize: this.pageSize,
      index: 0,
      status: this.status
    };

    const request = await this.massMailSearchService.getRecords(criteria);
    this.records = request.records;
    this.totalRecords = request.totalRecords;
    this.spinnerService.hide();

  }
  async mounted() {
    this.toastService.set(this);
    await this.loadData();

  }

  async showHistory(record) {
    //this.records = [];
    //return;
    if (record.showHistory) {
      record.showHistory = false;
      this.records = this.records.slice();
      return null;
    }

    this.spinnerService.show();

    record.history = await this.massMailSearchService.getRecordHistory(record.id);

    this.spinnerService.hide();
    record.showHistory = !record.showHistory;

    //had to hack here because vue doesn't work well with nested arrays
    this.records = this.records.slice();


  }

  _initializeConfirmCancelDialog() {
    this.dialogService.initialize(this.$refs.confirmCancel);
    this.dialogService.title = "Confirm Cancel?"
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-warning d-inline-block"><i class="fa fa-exclamation-triangle"></i> </h3>
          <span class="message">Are you sure you want to cancel this request?<br/><br/></span></div>`;
    this.dialogService.confirmResponse = this.onCancelMassMail;

  }

  _initializeSendMessageDialog(id) {
    this.dialogService.initialize(this.$refs.sendMessage);
    this.dialogService.title = `MassMail Id ${id}`;
    this.dialogService.confirmResponse = this.onSendMessage;





  }

  async onCancelMassMail() {
    this.toastService.success(`Canceled MassMail Request ${this._cancelRecordId}`);
    this.massMailSearchService.delete(this._cancelRecordId);
    await this.loadData();
  }
  _cancelRecordId = 0;
  cancel(id) {
    this._cancelRecordId = id;
    this._initializeConfirmCancelDialog();
    this.$refs.confirmCancel.show();

  }

  async onSendMessage(message) {
    this.spinnerService.show();

    try {
      await this.sendMessageService.send(message);
      this.toastService.success("Successfully sent message to user");
    } catch (e) {
      console.log(e);
      this.toastService.error("Failed to send message to user");
    } finally {
      this.spinnerService.hide();
    }
    
  }

  sendMessage(id) {
    const record = this.records.find(c => c.id === id);
    this._initializeSendMessageDialog(id);
    
    this.$refs.sendMessage.show(record);
  }

  async created() {


  }
}
