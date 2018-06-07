import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import SearchForm from './modules/search-form.vue';
import Pagination from './modules/pagination.vue';
import ConfirmDialog from '../common/dialogs/confirm-dialog.vue';
import SendMessageDialog from '../common/dialogs/send-message-dialog.vue';
import DenyRequestDialog from '../common/dialogs/deny-request-dialog.vue';
import TabbedControl from '../common/tabbed-control/tabbed-control.vue';
import TabbedItem from '../common/tabbed-control/tabbed-item.vue';

import numeral from 'numeral';
@Component({
  name: 'view-request',
  components: { SearchForm, Pagination, ConfirmDialog, SendMessageDialog, DenyRequestDialog, TabbedControl, TabbedItem },
  dependencies: ['$', 'massMailService', 'userService', 'spinnerService', 'toastService', 'dialogService','sendMessageService'],
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

      const request = await this.massMailService.getRecords(criteria);
      
      this.records = request.records;
      this.spinnerService.hide();
    }, 100);
  }
  async onDenyMassMail(model,comment) {

    try {
      if (model.type === 'student') {
        await this.massMailService.denyStudentsRequest(model.id, comment);
      }
      else if (model.type === 'employee') {
        await this.massMailService.denyEmployeesRequest(model.id, comment);
      }
      await this.loadData();
      this.toastService.success("Successfully denied " + model.id);
    } catch (e) {
      console.log(e);
      this.toastService.error("Failed to update record");
    } 
    
  }
  async onApproveMassMail(model) {
    try {
      if (model.type === 'student') {
        await this.massMailService.approveStudentsRequest(model.id);
      }
      else if (model.type === 'employee') {
        await this.massMailService.approveEmployeesRequest(model.id);
      }
      await this.loadData();
      this.toastService.success(`Successfully approved ${model.type} ${model.id}`);
    } catch (e) {
      console.log(e);
      this.toastService.error("Failed to update record");
    } 
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
    
    const request = await this.massMailService.getRecords(criteria);
    
    this.records = request.records;

    this.totalRecords = request.totalRecords;


  }
  async loadData() {
    this.spinnerService.show();

    const criteria = {
      pageSize: this.pageSize,
      index: 0,
      status: this.status
    };

    const request = await this.massMailService.getRecords(criteria);

    
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

    const historyTask = this.massMailService.getRecordHistory(record.id);
    const commentsTask = this.massMailService.getRecordComments(record.id);

    const response = await Promise.all([commentsTask, historyTask]);

    record.comments = response[0];
    record.history = response[1];
    console.log(record.comments);
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

  _initializeDenyMessageDialog(record,type) {
    this.dialogService.initialize(this.$refs.denyRequest);
    this.dialogService.title = `Deny MassMail ${record.subject}?`;
    this.dialogService.entity = { id: record.id,type: type };
    this.dialogService.confirmResponse = this.onDenyMassMail;

  }

  _initializeApproveMessageDialog(record, type) {
    this.dialogService.initialize(this.$refs.denyRequest);
    this.dialogService.title = `Approve ${record.subject}?`;
    this.dialogService.entity = { id: record.id, type: type };

    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-success d-inline-block"><i class="fa fa-exclamation-triangle"></i> </h3>
          <span class="message">Approve Record for ${type}?<br/><br/></span></div>`;


    this.dialogService.confirmResponse = this.onApproveMassMail;

  }

  approveMessage(record,type) {
    this._initializeApproveMessageDialog(record, type);
    this.$refs.confirmCancel.show();
    
  }
  denyMessage(record, type) {
    this._initializeDenyMessageDialog(record,type);
    this.$refs.denyRequest.show();

  }


  async onCancelMassMail() {
    await this.massMailService.delete(this._cancelRecordId);
    await this.loadData();

    this.toastService.success(`Canceled MassMail Request ${this._cancelRecordId}`);
  }
  _cancelRecordId = 0;
  cancel(id) {
    this._cancelRecordId = id;
    this._initializeConfirmCancelDialog();
    this.$refs.confirmCancel.show();

  }

  

  sendMessage(id) {
    const record = this.records.find(c => c.id === id);
    this._initializeSendMessageDialog(id);
    
    this.$refs.sendMessage.show(record);
  }

  async created() {


  }

  async test() {
    await this.loadData();

  }
}
