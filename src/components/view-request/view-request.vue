<template>
  <div class="container">
   
    <search-form :searchHandler="searchHandler"></search-form>

    <div class="row">
      <div class="col ">
        <div class="text-primary h5 mt-4">Total Records: {{totalRecords  |formatNumber}}</div>
      </div>
      <div class="col" style="height:70px;">
        <transition name="fade">
          <div v-show="totalRecords > pageSize">
            <pagination :totalRecords="totalRecords"
                        :index="pageIndex"
                        :navHandler="pagingHandler"
                        class="d-inline-block float-right mt-3"></pagination>
          </div>
        </transition>
      </div>

    </div>



    <table class="table table-sm table-borderless">
      <thead>
        <tr class="bg-primary text-light">
          <th scope="col">#</th>
          <th scope="col">Status</th>
          <th scope="col">Submitted By</th>
          <th scope="col" class="text-right pr-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(record, index) in records">
          <tr :class="{'alt': index % 2 == 0}">
            <td>
              {{record.id}}
            </td>
            <td>{{record.status}}</td>
            <td>{{record.author}}</td>
            <td class="text-right">
              <div class="dropdown ">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Action
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                  <li>
                    <router-link :to="{path: 'create-request/' + record.id + '/message-summary'}"><i class="fa fa-folder-open mr-2"></i> View</router-link>
                  </li>
                  <li>
                    <router-link :to="{path: 'create-request/' + record.id}"><i class="fa fa-pencil mr-2"></i> Edit</router-link>
                  </li>
                  <li v-is-in-role="'approver,admin'"><a href="javascript:void(0);" @click="sendMessage(record.id)"><i class="fa fa-envelope-o mr-2"></i> Send Message</a></li>
                  <li v-is-in-role="'approver'" v-is-author="record"><a href="javascript:void(0);" @click="cancel(record.id)"><i class="fa fa-times-circle mr-2"></i> Cancel</a></li>
                  <li><a href="javascript:void(0);" @click="copyMessage(record.id)"><i class="fa fa-copy mr-2"></i> Copy</a></li>
                  <li class="dropdown-submenu" v-is-status="{record: record, status: 'CREATED',population: 'STUDENTS'}" v-is-approver="{role: 'student'}">
                    <a href="javascript:void(0);" tabindex="-1"><i class="fa fa-user mr-2"></i> Students Action</a>
                    <ul class="dropdown-menu">
                      <li><a href="javascript:void(0);" @click="approveMessage(record, 'student')"><i class="fa fa-thumbs-o-up mr-2"></i> Approve</a></li>
                      <li><a href="javascript:void(0);" @click="denyMessage(record, 'student')"><i class="fa fa-thumbs-o-down mr-2"></i> Deny</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu" v-is-status="{record: record, status: 'CREATED', population: 'EMPLOYEES'}" v-is-approver="{role: 'employee'}">
                    <a href="javascript:void(0);" tabindex="-1"><i class="fa fa-user-o mr-2"></i> Employee Action</a>
                    <ul class="dropdown-menu">
                      <li><a href="javascript:void(0);" @click="approveMessage(record, 'employee')"><i class="fa fa-thumbs-o-up mr-2"></i> Approve</a></li>
                      <li><a href="javascript:void(0);" @click="denyMessage(record, 'employee')"><i class="fa fa-thumbs-o-down mr-2"></i> Deny</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          <tr :class="{'alt': index % 2 == 0}">
            <td colspan="4">
              <div>
                <div class="row">
                  <div class="col">
                    <label class="font-weight-bold mr-2">Send Date</label>{{record.sendDate | formatDate}}
                  </div>
                  <div class="col">
                    <label class="font-weight-bold mr-2">Expiration Date</label>{{record.expirationDate | formatDate}}
                  </div>
                </div>
                {{record.subject}}
              </div>
              <transition name="fade-h-o">
                <div v-if="record.showHistory" class="overflow-hidden hidden-tables">
                  <tabbed-control tabs="Comments,Record History">

                    <tabbed-item slot="tab_0">
                      <table class="table table-sm table-borderless small">
                        <thead class="bg-dark text-light">
                          <tr>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Type</td>
                            <td>Author</td>
                          </tr>
                        </thead>
                        <tbody>
                          <template v-for="(comment, index) in record.comments">
                            <tr :class="{'alt': index % 2 == 0}">
                              <td>{{comment.createDate | formatDate}}</td>
                              <td>{{comment.createDate | formatTime}}</td>
                              <td>{{comment.commentTypeCode}}</td>
                              <td>{{comment.createUser}}</td>
                            </tr>
                            <tr :class="{'alt': index % 2 == 0}">
                              <td colspan="4">
                                {{comment.comment}}
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </tabbed-item>
                    <tabbed-item slot="tab_1">
                      <table class="table table-sm table-borderless small">
                        <thead class="bg-dark text-light">
                          <tr>
                            <td>Date</td>
                            <td>Time</td>
                            <td>Action</td>
                            <td>Performed By</td>
                            <td>Name</td>

                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in record.history" :class="{'alt': index % 2 == 0}">
                            <td>{{item.date | formatDate}}</td>
                            <td>{{item.date | formatTime}}</td>
                            <td>{{item.action}}</td>
                            <td>{{item.user}}</td>
                            <td>{{item.name}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </tabbed-item>

                  </tabbed-control>
                  


                </div>
              </transition>
              <div class="text-center h5 ">
                <a href="javascript:void(0)" @click="showHistory(record)"><i class="fa fa-angle-down" :class="{open: record.showHistory}"></i></a>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div class="col" style="height:70px;">
      <transition name="fade">
        <div v-show="totalRecords > pageSize">
          <pagination :totalRecords="totalRecords"
                      :index="pageIndex"
                      :navHandler="pagingHandler"
                      class="d-inline-block float-right mt-3"></pagination>
        </div>
      </transition>
    </div>
    <confirm-dialog id="confirmCancel"
                    ref="confirmCancel"></confirm-dialog>
    <send-message-dialog id="sendMessage"
                         ref="sendMessage"></send-message-dialog>
    <deny-request-dialog id="denyRequest"
                         ref="denyRequest"></deny-request-dialog>
  </div>
</template>
<script src="./view-request.js"></script>
<style lang="scss" src="./view-request.scss"></style>
<a href="view-request.vue">view-request.vue</a>
