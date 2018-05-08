import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
import SearchForm from './modules/search-form.vue';
import Pagination from './modules/pagination.vue';
import numeral from 'numeral';
@Component({
  name: 'view-request',
  components: { SearchForm, Pagination },
  //,components: { ConfirmDialog, CreateRequestNav, MessageDialog}
  dependencies: ['$', 'massMailSearchService', 'userService', 'spinnerService', 'toastService', 'dialogService'],
  filters: {
    formatNumber: (value) => {
      return numeral(value).format("0,0");
    }
  }
})

export default class ViewRequest extends Vue {
  records = [];
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
        index: this.pageIndex
      };

      const request = await this.massMailSearchService.getRecords(criteria);
      this.records = request.records;
      this.spinnerService.hide();
    }, 100);
  }

  async onFilter(text) {
    
    this.pageIndex = 0;
    
    const criteria = {
      pageSize: this.pageSize,
      index: this.pageIndex,
      textFilter: text
    };

    const request = await this.massMailSearchService.getRecords(criteria);
    this.records = request.records;
    this.totalRecords = request.totalRecords;


  }

  async mounted() {
    this.toastService.set(this);
    this.spinnerService.show();

    const criteria = {
      pageSize: this.pageSize,
      index: 0
    };

    const request = await this.massMailSearchService.getRecords(criteria);
    this.records = request.records;
    this.totalRecords = request.totalRecords;
    this.spinnerService.hide();

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

  async created() {


  }
}
