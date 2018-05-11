<template>
  <div>
    <!-- Modal -->
    <div :id="id" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-dark text-light">
            <h5 class="modal-title" id="exampleModalLongTitle">Manage Users</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <label class="font-weight-bold">UserName</label>
                      <input type="text" class="form-control" placeholder="Onyen" v-model="onyen" v-select-all-on-focus/>
                    </div>
                  </div>
                  <div class="row mt-1">
                    <div class="col">
                      <label class="font-weight-bold">Roles</label>
                      <div class="container border border-primary">
                        <div class="row pt-1" v-for="role in roles">
                          <div class="form-inline">
                            <input type="checkbox" class="form-contol form-check form-control-lg ml-2" @change="showHide(role,$event)" />
                            <label class="ml-2">  {{role.name}}</label>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>

                  
                  <transition name="fade-h-o">
                    <div class="row mt-1" v-if="showDepartments">
                      <div class="col">
                        <label class="font-weight-bold">Departments</label>
                        <div class="container border border-primary">
                          <div class="row">
                            <div class="col">
                              <div class="p-1 form-inline float-right mt-2 mb-2">
                                <input type="text" class="form-contol" placeholder="Department Number" v-model="departmentNumber" v-select-all-on-focus/>
                                <button class="btn btn-primary btn-sm ml-1" @click="addDepartment">Add</button>
                              </div>
                            </div>
                          </div>
                          <div class="row" v-for="department in assignedDepartments">
                            <div class="col-2">
                                {{department.id}}
                            </div>
                            <div class="col-7">
                                {{department.name}}
                            </div>
                            <div class="col-3 text-right">
                              <a href="javascript:void(0)" @click="removeDepartment(department)">Remove</a>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
            </div>




          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="decline()">Cancel</button>
            <button type="button" class="btn btn-primary" @click="confirm()">Save</button>
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
    name: 'input-dialog',
    dependencies: ['$', 'dialogService','administratorService','departmentLookupService']

  })
  export default class AdminUserDialog extends Vue {
    @Prop() id;
    roles = [];
    assignedDepartments = [];
    onyen = '';
    departmentNumber = '';
    showDepartments = false;

    confirm() {

      //const $ = this.$;
      //this.dialogService.confirmResponse();
      //
      //$("#" + this.id).modal('hide');
    }
    decline() {
      const $ = this.$;
      this.dialogService.declineResponse();

      $("#" + this.id).modal('hide');
    }

    async addDepartment() {

      const departmentNumber = this.departmentNumber.trim();
      if (!departmentNumber.trim() || !this.onyen.trim()) {
        return;
      }

      await this.administratorService.addAssignDepartment(this.onyen, departmentNumber);

      this.assignedDepartments = await this.administratorService.getAssignedDepartments(this.onyen);

      this.departmentNumber = '';

    }
    async removeDepartment(department) {
      await this.administratorService.removeAssignedDepartment(this.onyen, department.id);
      this.assignedDepartments = await this.administratorService.getAssignedDepartments(this.onyen);
    }

    async mounted() {
      this.roles = await this.administratorService.getRoles();

    }
    showHide(role,ev) {
      if (role.name !==   "Approver") {
        return;
      }

      this.showDepartments = ev.target.checked;

    }

    show() {
      const $ = this.$;

      this.title = this.dialogService.title;
      this.message = this.dialogService.message;


      $("#" + this.id).modal('show');
    }
  }

</script>
<style scoped lang="scss">
</style>

