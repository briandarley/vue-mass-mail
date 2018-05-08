import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator";
@Component({
    name: 'pagination',
    dependencies: ['$', '_']
    //,components: { ConfirmDialog, CreateRequestNav, MessageDialog}
  })

export default class Pagination extends Vue {
  @Prop({ default: 0 }) totalRecords;
  @Prop({ default: 0 }) index;
  @Prop({ default: 10 }) pageSize;
  @Prop({ default: 5 }) numberOfButtons;
  @Prop() navHandler;

  @Watch('index')
  onIndexChanged(value) {
    
    this.currentIndex = value;
    this.navHandler.navigate(value);
  }

  @Watch('currentIndex')
  onCurrentIndexChanged(value) {
    if (!this.navHandler || !this.navHandler.navigate) return;
    this.navHandler.navigate(value);
  }

  currentIndex = 0;

  range(start, end) {

    if (start <= 1) {
      start = 1;
    }
    return this._.range(start, end + 1, 1);
  }

  get enablePrev() {
    if (this.currentIndex === 0) {
      return false;
    }
    return true;
    
  }
  get enableNext() {
    const maxIndex = Math.ceil(this.totalRecords / this.pageSize) -1;

    if (this.currentIndex >= maxIndex) {
      return false;
    }
    return true;
  }

  get showEllipsePre() {
    

    if (this.currentIndex > 0 && this.maxButtonIndex >= this.numberOfButtons) {
      return true;
    }
    return false;
  }
  get showEllipseNext() {
    const maxIndex = Math.ceil(this.totalRecords / this.pageSize);
    if (this.currentIndex >= (maxIndex - this.numberOfButtons)) {
      return false;
    }
    return true;
  }
 

  
  get maxButtonIndex() {
    let result = this.currentIndex + this.numberOfButtons;

    const val = Math.ceil(this.totalRecords / this.pageSize);
    if (result >= val) {
      result = val;
    }
    
    return result;
  }

  navigateToFirst() {
    this.currentIndex = 0;
  }
  navigateToLast() {
    const maxIndex = Math.ceil(this.totalRecords / this.pageSize) - 1;
    this.currentIndex = maxIndex;
  }

  onPrevClick() {
    this.currentIndex--;
  }
  onNextClick() {
    this.currentIndex++;

  }

  navigateTo(index) {
    this.currentIndex = (index - 1);
  }

  mounted() {
    
    
  }

}
