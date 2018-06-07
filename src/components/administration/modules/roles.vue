<template>

  <div class="container">
    <div class="row">
      <div class="col-4 align-self-center">
        <div class="font-weight-bold h5 text-primary">Roles</div>
      </div>
      <div class="col">

      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table table-striped table-sm mt-2">
          <thead class="bg-dark text-light">
            <tr>
              <th style="width: 40%">Role Id</th>
              <th style="width: 40%">Name</th>
              <th style="width: 40%"></th>
            </tr>
          </thead>
          <tr v-for="role in roles">
            <td>
              {{role.id}}
            </td>
            <td>
              <template v-if="role.isEdit">
                <input class="form-control" v-model="role.name" />
              </template>
              <template v-else>
                {{role.name}}
              </template>


            </td>
            <td class="text-primary text-right">
              <a href="javascript:void(0)" @click="editRole(role)">
                <template v-if="role.isEdit">
                  Save
                </template>
                <template v-else>
                  Edit
                </template>
                  

              </a> |
              <a href="javascript:void(0)" @click="removeRole(role.id)">Remove</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <button class="btn btn-primary pull-right mt-5 mb-3 action-button" @click="addRole">Add Role</button>


    <input-dialog id="addRole"
                  title="Add New Role"
                  message="Add New Role"
                  ref="addRoleDialog"
                  :confirmResponse="onAddRole"></input-dialog>
    <confirm-dialog id="confirm"
                    ref="confirmDialog"></confirm-dialog>
  </div>
</template>
<script src="./roles.js"></script>
<style lang="scss" src="./roles.scss" scoped></style>
