<template>
  <div>
  <!-- Modal -->
  <div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document" >
      <div class="modal-content">
      <div class="modal-header bg-dark text-light">
          <h5 class="modal-title" id="exampleModalLongTitle">Preview: {{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
        <div class="modal-body">
          
          <div v-html="message"></div>
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary"   @click="confirm()">Ok</button>
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import Vue from "vue"
import {Component ,Prop} from "vue-property-decorator"

@Component({
  name: 'preview-dialog',
  dependencies: ['$']

})
  export default class PreviewDialog extends Vue{
    @Prop() title;
    @Prop() message;
    @Prop() confirmResponse;
    @Prop() declineResponse;
    @Prop() id;

    
    confirm() {
      var $ = this.$;
      //this.confirmResponse();
      $("#" + this.id).modal('hide');
    }
    decline() {
      var $ = this.$;
      //this.declineResponse();
      $("#" + this.id).modal('hide');
    }

    show() {
      var $ = this.$;
      
      $("#" + this.id).modal('show');
      
    }
}

</script>
<style  lang="scss">
  
  .modal-body, .modal-content {
    width: 640px !important;
    margin-left:auto;
    margin-right:auto;
  }

</style>

