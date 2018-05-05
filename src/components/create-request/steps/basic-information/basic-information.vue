<template>
  <form id="basic-information" class="needs-validation" novalidate>
    
      <div class="card mt-4">
        <div class="card-header bg-primary text-light">Create Mass Mail - Basic Information</div>
        <div class="card-body">
          <div class="row mt-4">
            <div class="col p-0">

              <date-picker id="sendDate"
                           label="Send Date"
                           :selectedDate="model.sendDate"
                           v-on:update="setSendDate"
                           required="true"
                           v-validate="{model:model, error: 'Send Date Required'}"
                           ></date-picker>
              
            </div>
            <div class="col p-0">
              <date-picker
                           id="expirationDate"
                           label="Expiration Date"
                           :selectedDate="model.expirationDate"
                           v-on:update="setExpirationDate"

                           required="true"
                           v-validate="{model:model, error: 'Expiration Date Required'}"
                           ></date-picker>

            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <div class="row">
                <div class="col-md-4 text-right pt-2">
                  <label>Send From</label>
                </div>
                <div class="col-md-8">
                  <div class="form-inline input-group">
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="model.sendFrom" placeholder="no_reply@unc.edu"  />
                      <span class="input-group-addon btn btn-outline-light text-info border-secondary" @click="sendFrom = ''">
                        <i class="fa fa-at"></i>
                      </span>
                    </div>
                  </div>
                  <pop-over class=""
                            title="Send From"
                            data-content="If you do not wish to receive replies to your message, specify no_reply@unc.edu in the 'Send From' field and leave the 'Reply To' field blank"
                            link-text="Don't want to receive replies?"></pop-over>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="row">
                <div class="col-sm-4 text-right  pt-2">
                  <label class="mr-2">Reply To (optional)</label>
                </div>
                <div class="col-sm-8">
                  <div class="form-inline input-group">

                    <div class="input-group ">

                      <input type="text" class="form-control" v-model="model.replyTo" placeholder="no_reply@unc.edu" />
                      <span class="input-group-addon btn btn-outline-light text-info border-secondary" @click="replyTo = ''">
                        <i class="fa fa-at"></i>
                      </span>
                      <pop-over class="ml-2 align-self-center"
                                title="Reply To"
                                data-content="This is where e-mail replies will be delivered. This can be a shared folder or commercial mail account. If left blank, defaults to the same address as 'Send From'"
                                link-text=""></pop-over>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col">
              <div class="row">
                <div class="col-sm-4 text-right pt-2">
                  <label>Mass Mail Subject</label>
                </div>
                <div class="col-sm-8">

                  <input
                         id="subject"
                         type="text"
                         class="form-control col-sm-8"
                         v-model="model.subject"
                         required="true"
                         v-validate="{model:model, error: 'Subject Required'}"/>
                  <pop-over class="ml-2 align-self-center"
                            title="Subject"
                            data-content="The subject line for the message. When the message is sent, the subject line is prepended with wither INFORMATIONAL or FORMAL NOTICE, based on the selected priority."
                            link-text=""></pop-over>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="row">
                <div class="col-sm-4 text-right pt-2">
                  <label class="mr-2">Sponsoring University</label>
                </div>

                <type-ahead :id="'sponsoringUniversity'"
                            :placeHolder="'School or Department Name'"
                            :value="model.sponsoringUniversity"
                            v-on:change="setSponsoringUniversity"
                            :service="departmentSchoolLookupService.getSchoolsDepartmentsLike">
                  <pop-over class="ml-2 align-self-center"
                            slot="info"
                            title="Sponsor"
                            data-content="Name of the UNC department, unit, or recognized student organiztion that is sponsoring this mass email message."
                            link-text=""></pop-over>
                </type-ahead>


              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="row">
                <div class="col-sm-4 text-right pt-2">
                  <label class="mr-2">Priority</label>
                </div>
                <div class="col-sm-8">
                  <select class="form-control col-sm-8" v-model="model.priority">
                    <option value="">--Select Priority--</option>
                    <option>Informational</option>
                    <option>Formal Notice</option>
                  </select>
                  <pop-over class="ml-2 align-self-center"
                            title="Sponsor"
                            data-content="Name of the UNC department, unit, or recognized student organiztion that is sponsoring this mass email message."
                            link-text=""></pop-over>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-sm-12">
              <label class="d-inline-block">Comments (optional, not published)</label>
              <pop-over class="ml-2 float-right"
                        title="Comments"
                        data-content="Special instructions or notes pertinent to the e-mail. Text entered in this field do not become part of the message that is e-mailed. It is appended to the comments log and is available each time the request is viewed."
                        link-text=""></pop-over>
              <textarea class="form-control col-md-12" rows="4" v-model="model.comments"></textarea>
            </div>
          </div>

        </div>
      </div>









    </div>
    </form>


</template>
<script src="./basic-information.js"></script>
<style lang="scss" src="./basic-information.scss"></style>

