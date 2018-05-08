<template>
  <div id="messageSummary">
    <div class="card mt-4">
      <div class="card-header bg-primary text-light">Create Mass Mail - Message Summary</div>
      <div class="card-body">
        <div class="row mt-4">
          <div class="col ">
            <label class="mr-1">Send Date</label>
            <span class="font-weight-bold">{{model.sendDate}}</span>
          </div>
          <div class="col">
            <label class="mr-1">Expiration Date</label>
            <span class="font-weight-bold">{{model.expirationDate}}</span>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <div class="row">
              <div class="col-md-5 text-right pt-2">
                <label>Send From</label>
              </div>
              <div class="col-md-7 align-self-center">
                <span class="font-weight-bold">{{model.sendFrom}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="col">
            <div class="row">
              <div class="col-md-5 text-right pt-2">
                <label>Reply To</label>
              </div>
              <div class="col-md-7 align-self-center">
                <span class="font-weight-bold">{{model.replyTo}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="row">
              <div class="col-md-5 text-right pt-2">
                <label>Subject</label>
              </div>
              <div class="col-md-7 align-self-center">
                <span class="font-weight-bold">{{model.subject}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="col">
            <div class="row">
              <div class="col-md-5 text-right pt-2">
                <label>Sponsoring Organization</label>
              </div>
              <div class="col-md-7 align-self-center">
                <span class="font-weight-bold">{{model.sponsoringUniversity}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="col">
            <div class="row">
              <div class="col-md-5 text-right pt-2">
                <label>Priority</label>
              </div>
              <div class="col-md-7 align-self-center">
                <span class="font-weight-bold">{{model.priority}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="col">
            <div class="row">
              <div class="col-md-5 text-right pt-2">
                <label>Sending Criteria</label>
              </div>
              <div class="col-md-7" v-html="getAudienceCriteria()"></div>
            </div>
          </div>
        </div>
        <div class="row mt-4 mb-4">
          <div class="col">

            <div class="row">
              <div class="col-md-12">
                <a href="javascript:void(0);" class="btn btn-labeled btn-primary text-light ml-1 pull-right" @click="previewMessage">
                  <span class="btn-label "><i class="fa fa-book"></i></span>Preview Message
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="row ">
          <div class="col">
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header bg-secondary text-light">Test Messages</div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-12">
                        <label>Enable Default Reviewers</label>
                        <switch-slider :enabled="useDefaultReviewers" @update="setUseDefaultReviewers"></switch-slider>
                      </div>
                    </div>
                    <transition name="fade-h-o">
                      <div v-if="useDefaultReviewers">
                        <div class="row">
                          <div class="col-md-12">
                            <p class="info">
                              <i class="fa fa-info-circle text-warning"></i>
                              Send test messages to others or yourself.
                              If you routinely use MassMail and send test messages to other persons, add the person to your favorites. This list will be persisted to your profile
                            </p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <label>Favorite Reviewers</label>
                            <div class="input-group">
                              <select class="form-control" v-model="selectedReviewer">
                                <option value=""></option>
                                <option v-for="item in reviewers">{{item}}</option>
                              </select>
                              <a href="javascript:void(0)" class="btn btn-outline-light" @click="addReviewer">
                                <i class="fa fa-plus-circle text-success"></i>
                              </a>
                              <a href="javascript:void(0)" class="btn btn-outline-light" @click="removeReviewer">
                                <i class="fa fa-minus-circle text-danger"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>

                    <div class="row mt-4 ">
                      <div class="col-sm-9 ">
                        <input type="text" class="form-control" placeholder="Email Address" />
                      </div>
                      <a href="javascript:void(0);" class="btn btn-labeled btn-primary text-light ml-1">
                        <span class="btn-label "><i class="fa fa-telegram"></i></span>Send Test
                      </a>

                    </div>
                  </div>
                </div>

              </div>
              <div class="col-md-8">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <input-dialog id="addReviewerDialog"
                  title="Add Reviewer"
                  message="Add an email address to your list of favorite recipients"
                  ref="addReviewerDialog"
                  :confirmResponse="onAddReviewer"></input-dialog>
    <preview-dialog id="previewDialog"
                  title="Preview Message"
                  :message="model.content"
                  ref="previewDialog"
                  ></preview-dialog>
  </div>
</template>
<script src="./message-summary.js"></script>
<style lang="scss" src="./message-summary.scss"></style>
