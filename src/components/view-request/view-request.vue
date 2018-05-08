<template>
  <div class="container">
    
    <search-form :searchHandler="searchHandler"></search-form>

    <div class="row">
      <div class="col ">
        <div class="text-primary h5 mt-4">Total Records: {{totalRecords  |formatNumber}}</div>
      </div>
      <div class="col">
        <pagination :totalRecords="totalRecords"
                    :index="pageIndex"
                    :navHandler="pagingHandler"
                    class="d-inline-block float-right mt-3"></pagination>
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
                  <li><a href="javascript:void(0);"><i class="fa fa-folder-open mr-2"></i> View</a></li>
                  <li><a href="javascript:void(0);"><i class="fa fa-pencil mr-2"></i> Edit</a></li>
                  <li><a href="javascript:void(0);"><i class="fa fa-times-circle mr-2"></i> Cancel</a></li>
                  <li><a href="javascript:void(0);"><i class="fa fa-copy mr-2"></i> Copy</a></li>
                  <li class="dropdown-submenu">
                    <a href="javascript:void(0);" tabindex="-1"><i class="fa fa-user mr-2"></i> Students Action</a>
                    <ul class="dropdown-menu">
                      <li><a href="javascript:void(0);"><i class="fa fa-thumbs-o-up mr-2"></i> Approve</a></li>
                      <li><a href="javascript:void(0);"><i class="fa fa-thumbs-o-down mr-2"></i> Deny</a></li>
                    </ul>
                  </li>
                  <li class="dropdown-submenu">
                    <a href="javascript:void(0);" tabindex="-1"><i class="fa fa-user-o mr-2"></i> Employee Action</a>
                    <ul class="dropdown-menu">
                      <li><a href="javascript:void(0);"><i class="fa fa-thumbs-o-up mr-2"></i> Approve</a></li>
                      <li><a href="javascript:void(0);"><i class="fa fa-thumbs-o-down mr-2"></i> Deny</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          <tr :class="{'alt': index % 2 == 0}">
            <td colspan="4">
              <div>{{record.subject}}</div>

              <transition name="fade-h-o">
                <div v-if="record.showHistory" class="overflow-hidden">
                  <span class="font-weight-bold">Record History</span>
                  <table class="table table-sm table-borderless small">

                    <thead class="bg-dark text-light">
                      <tr>
                        <td>Date</td>
                        <td>Action</td>
                        <td>Performed By</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in record.history">
                        <td>{{item.date}}</td>
                        <td>{{item.action}}</td>
                        <td>{{item.user}}</td>
                        <td>{{item.firstName}}</td>
                        <td>{{item.lastName}}</td>
                      </tr>

                    </tbody>
                  </table>
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

    <pagination :totalRecords="totalRecords"
                :index="pageIndex"
                :navHandler="pagingHandler"
                class="d-inline-block float-right mt-3"></pagination>

  </div>
</template>
<script src="./view-request.js"></script>
<style lang="scss" src="./view-request.scss"></style>
