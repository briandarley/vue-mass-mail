<template>
  

  <div class="container">
    <div class="row">
      <div class="col-4 align-self-center">
        <div class="font-weight-bold h5 text-primary">Users</div>
      </div>
      <div class="col">
        
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table table-striped table-sm mt-2">
          <thead class="bg-dark text-light">
            <tr>
              <th style="width: 40%">User Id</th>
              <th style="width: 40%">Roles</th>
              <th style="width: 40%"></th>
            </tr>
          </thead>
          <tr>
            <td>bdarley</td>
            <td>
              admin, approver
              
            </td>
            <td class="text-primary text-right">
              <a href="javascript:void(0)">Edit</a> |
              <a href="javascript:void(0)">Remove</a>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <button class="btn btn-primary pull-right mt-5 mb-3" @click="addUser">Add User</button>

    <admin-user-dialog id="adminUserDialog" ref="adminUserDialog"></admin-user-dialog>
  </div>

</template>
<script src="./approvers.js"></script>
<style lang="scss" src="./approvers.scss"></style>
