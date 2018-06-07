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
          <tr v-for="user in this.users">
            <td>{{user.name}}</td>
            <td>
              {{user.roles}}
            </td>
            <td class="text-primary text-right">
              <a href="javascript:void(0)" @click="editUser(user)">Edit</a> |
              <a href="javascript:void(0)" @click="deleteUser(user)">Remove</a>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <button class="btn btn-primary pull-right mt-5 mb-3 action-button" @click="addUser">Add User</button>

    <admin-user-dialog id="adminUserDialog" ref="adminUserDialog"></admin-user-dialog>
    <confirm-dialog id="confirm"
                    ref="confirmDialog"></confirm-dialog>
  </div>

</template>
<script src="./users.js"></script>
<style lang="scss" src="./users.scss"></style>
