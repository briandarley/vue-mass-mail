<template>
  <div>
    <!-- Modal -->
    <div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-light">
            <h5 class="modal-title" id="exampleModalLongTitle">Message: {{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Please indicate why this MassMail request has been denied.
            </p>
            <textarea class="w-100" rows="5" v-model="comment" v-focus="isShow">
  
            </textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="decline()" >Cancel</button>
            <button type="button" class="btn btn-primary" @click="confirm()">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import { Component, Prop } from "vue-property-decorator"

  @Component({
    name: 'message-dialog',
    dependencies: ['$', 'dialogService']

  })
  export default class DenyRequestDialog extends Vue {
    @Prop() id;
    title = "";
    comment = "";
    isShow = false;

    initialize() {
      this.isShow = false;
    }

    confirm() {
      var $ = this.$;
      this.dialogService.confirmResponse(this.dialogService.entity, this.comment);
      $("#" + this.id).modal('hide');
      this.initialize();
    }
    decline() {
      var $ = this.$;
      this.dialogService.declineResponse();
      $("#" + this.id).modal('hide');
      this.initialize();
    }

    show() {
      const $ = this.$;

      this.title = this.dialogService.title;
      this.message = this.dialogService.message;
      
      $("#" + this.id).modal('show');

        this.isShow = true;


      
      
    }
  }

</script>
<style scoped lang="scss">
</style>

