<template>
  <div>
    <!-- Modal -->
    <div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Send Message: {{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="validation-error">
                <h3 class="mr-2 text-info d-inline-block"><i class="fa fa-info-circle"></i> </h3>
                <span class="message">Note: All correspondence is saved as part of the comments for this request.<br /><br /></span>
              </div>

              <div class="row">
                <div class="col-md-4 text-right pt-2">
                  <label>Send To</label>
                </div>
                <div class="col-md-8">
                  <div class="form-inline input-group">
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="model.sendTo" placeholder="email@unc.edu" />
                      <span class="input-group-addon btn btn-outline-light text-info border-secondary" @click="model.sendTo = ''">
                        <i class="fa fa-at"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4 text-right pt-2">
                  <label>From</label>
                </div>
                <div class="col-md-8">
                  <div class="form-inline input-group">
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="model.sendFrom" placeholder="authors email@unc.edu" />
                      <span class="input-group-addon btn btn-outline-light text-info border-secondary" @click="model.sendFrom = ''">
                        <i class="fa fa-at"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 pt-2">
                  <label class="font-weight-bold">Subject</label>
                  <p>{{model.subject}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <label class="font-weight-bold">Message</label>
                  <textarea class="form-control" rows="12" v-model="model.message"></textarea>
                </div>
              </div>
            </div>


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="decline()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="confirm()">Send</button>
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
    name: 'send-message-dialog',
    dependencies: ['$', 'dialogService']

  })
  export default class SendMessageDialog extends Vue {
    @Prop() id;
    title = "";
    message = "";
    model = {
      sendTo: "",
      sendFrom: "",
      subject: "",
      message: ""
    }

    confirm() {
      var $ = this.$;
      this.dialogService.confirmResponse(this.model);

      $("#" + this.id).modal('hide');
    }
    decline() {
      var $ = this.$;
      this.dialogService.declineResponse();

      $("#" + this.id).modal('hide');
    }


    show(model) {
      const $ = this.$;
      this.model = model;
      this.title = this.dialogService.title;
      this.message = this.dialogService.message;


      this.model.message = `Hello,

The following comments have been logged about message Id: ${model.id} Subject: [${model.subject}].

If you have questions please contact us.

Cordially,
UNC Mass E - mail approvers.

`;


      $("#" + this.id).modal('show');
    }


  }

</script>
<style scoped lang="scss">
</style>

