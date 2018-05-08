import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
@
Component({
  name: 'search-form',
  dependencies: ['$']
//,components: { ConfirmDialog, CreateRequestNav, MessageDialog}
})

export default class SearchForm extends Vue {
  textFilter = '';
  status = '';
  @Prop() searchHandler;

  _searchFunc
  @Watch('textFilter')
  onSearchFilterChanged(value) {
    if (!this.searchHandler || !this.searchHandler.search) {
      return;
    }
    clearTimeout(this._searchFunc);

    this._searchFunc = setTimeout(() => {
        this.searchHandler.search(value);
      },
      200);

  }

  clearSearchRequest() {

  }

  

}
