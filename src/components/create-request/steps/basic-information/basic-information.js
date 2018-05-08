import Vue from "vue"
import {Component ,Prop,Watch} from "vue-property-decorator"
import DatePicker from '../../../common/datePicker/datePicker';
import PopOver from '../../../common/popover/popover';
import TypeAhead from '../../../common/type-ahead/type-ahead';



@Component({
  name: 'basic-infomation',
  dependencies: ['massMailSearchService','userService', 'toastService', 'spinnerService', '$', 'departmentSchoolLookupService','eventBus'],
  components: {DatePicker, PopOver, TypeAhead }

})
export default class CreateRequest extends Vue {
  @Prop() id;

  model = {};

  changeTimer;



  onBroadcastModelChange() {

    //prevent over doing it with change events
    window.clearTimeout(this.changeTimer);
    this.changeTimer = setTimeout(() => {

      this.eventBus.eventBus.$emit('model-changed', this.model);
      
    }, 500);

    setTimeout(() => {
        if (this.model.errors) {
          //if the model was previously initialized, i.e. model.errors, then re-validate
          //this is required because date-picker sets the form to 'needs-validation' which is not desired
          this.validate();
        }
      },
      100);


  }





  setExpirationDate(val) {
    this.model.expirationDate = val;
    this.onBroadcastModelChange();
  }
  setSendDate(val) {
    this.model.sendDate = val;
    this.onBroadcastModelChange();
  }
  setSponsoringUniversity(val) {
    this.model.sponsoringUniversity = val;
    this.onBroadcastModelChange();
  }

  

  save() {
    this.$refs.confirmDialog.show();

  }

  async mounted() {
    this.toastService.set(this);
    const $ = this.$;

    $('[data-toggle="popover"]').popover();

    this.model = this.massMailSearchService.model;
    
  }

  validate() {
    const $ = this.$;

    $(this.model).trigger("validate");
    

  }

  created() {


  }
}

