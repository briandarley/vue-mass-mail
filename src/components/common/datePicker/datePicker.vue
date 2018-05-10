<template>
  <div class="form-inline input-group">
    
    <label class="mr-2 mt-1 align-self-start">{{label}}</label>
    <div class="input-group date d-inline-block" data-provide="datepicker">
      <input type="text"
             class="form-control datepicker"
             placeholder="mm/dd/yyyy"
             v-model="value"
             ref="datepicker" />

      <span class="input-group-addon btn btn-outline-light text-info border-secondary">
        <i class="fa fa-calendar"></i>
      </span>
    
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import { Component, Prop, Watch } from "vue-property-decorator"

  @Component({
   
    name: 'datePicker',
    dependencies: ['datePickerService', '$', 'moment'],
  
  })
  export default class DatePicker extends Vue {
    @Prop() label;
    @Prop() selectedDate;



    @Watch('selectedDate', { immediate: false })
    onSelectedDateChanged(newValue, oldValue) {
      const moment = this.moment;
      this.value = moment(new Date(newValue)).format("MM/DD/YYYY");
    }

    value = "";


    get datePicker() {
      

      return this.selectedDate;
    }
    set datePicker(value) {
      this.$emit("update", value);
    }

    mounted() {
      
      var $ = this.$;
      var moment = this.moment;

      var date = new Date();
      date.setDate(date.getDate());

      $.fn.datepicker.defaults.autoclose = true;
      $.fn.datepicker.defaults.orientation = "bottom auto";
      $.fn.datepicker.defaults.startDate = date;
      
      
      $(this.$refs.datepicker)
        .datepicker()
        .on('change',
        e => {
          this.datePicker = e.target.value;
        });
     
      //if (moment(this.selectedDate).isValid()) {
      //  //$(this.$refs.datepicker)          .datepicker('update', moment(this.selectedDate).toDate());
          
      //}

      this.value = moment(this.selectedDate).format("MM/DD/YYYY");
      
      //moment YYYY-MM-DDT00:00:00

    }
    
  }

</script>
  <style scoped>
.datepicker {
  width: 150px;
}
</style>
