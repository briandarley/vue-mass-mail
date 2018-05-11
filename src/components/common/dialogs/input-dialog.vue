<template>
  <div>
  <!-- Modal -->
  <div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
      <div class="modal-header bg-dark text-light">
          <h5 class="modal-title" id="exampleModalLongTitle">Confirm: {{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div v-html>{{message}}</div>
        <input type="text" class="form-control" v-model="userInput" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="decline()" >Cancel</button>
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
  name: 'input-dialog',
  dependencies: ['$']

})
  export default class InputDialog extends Vue{
    @Prop() title;
    @Prop() message;
    @Prop() confirmResponse;
    @Prop() declineResponse;
    @Prop() id;

  userInput = "";
    
    confirm() {
      var $ = this.$;
      this.confirmResponse(this.userInput);
      this.userInput = "";
      $("#" + this.id).modal('hide');
    }
    decline() {
      var $ = this.$;
      this.declineResponse();
      this.userInput = "";
      $("#" + this.id).modal('hide');
    }

    show() {
      var $ = this.$;
      $("#" + this.id).modal('show');
    }
}

</script>
<style scoped lang="scss">
  

</style>

