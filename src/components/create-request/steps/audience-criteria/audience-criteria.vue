<template>
  <div id="audience-criteria">

    <div class="card mt-4">
      <div class="card-header bg-primary text-light">Create Mass Mail - Audience Criteria</div>
      <div class="card-body">
        <div class="row mt-4">
          <div class="col-md-12 h5 text-primary text-right">
            Audience Size: <span id="targetAudience"></span>
          </div>

        </div>
        <h6 class="mt-3">Create Mass Mail - Filter Criteria</h6>
        <div class="row mt-4">
          <div class="col">
            <div class="row">
              <div class="col-sm-5 text-right pt-2">
                <label>E-mail Target Population</label>
              </div>
              <div class="col-sm-7 p-0">
                <select class="form-control col-sm-8" v-model="model.targetPopulation" @change="calculateAudience">
                  <option value="">--Select Target Population --</option>
                  <option value="EMPLOYEES_STUDENTS">Employees and Students</option>
                  <option value="EMPLOYEES">Employees</option>
                  <option value="STUDENTS">Students</option>
                  <option value="TESTING_ONLY">Testing Only</option>
                </select>
                <pop-over class="ml-2 align-self-center"
                          title="Subject"
                          data-content="Select the appropriate target audience."
                          link-text=""></pop-over>
              </div>
            </div>
           
            
          </div>
        </div>
        <transition name="fade-h-o">
          <div id="employeeCriteria" class="row mt-4" v-if="showEmployeeCriteria">
            <div class="col">
              <div class="row">
                <div class="col-sm-5 text-right pt-2">
                  <label>Employee Criteria</label>
                </div>
                <div class="col-sm-7 p-0">
                  <select class="form-control col-sm-8" v-model="model.targetEmployee" @change="calculateAudience">
                    <option value="">--Select Employee Criteria --</option>
                    <option>All Employees</option>
                    <option>DDD</option>
                  </select>
                  <pop-over class="ml-2 align-self-center"
                            title="Subject"
                            data-content="Select the appropriate employee target."
                            link-text=""></pop-over>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <div class="row mt-4">
          <div class="col">
            <div class="row">
              <div class="col-sm-5 text-right pt-2">
                <label>Confirm Person Within Audience</label>
              </div>
              <div class="col-sm-7 p-0">
                <div class="input-group ">
                  <div class="input-group-append ">
                    <input type="text" class="form-control col-10" v-model="targetPerson" placeholder="ONYEN/PID" @keydown="clearCheckUserStatus" />
                    <span class="input-group-text" @click="targetPerson = ''"><i class="fa fa-remove"></i></span>

                  </div>
                  <button class="btn btn-primary btn-sm ml-1" @click="checkUser">Check</button>

                  <i class="fa fa-check-circle-o ml-3 fa-2x text-success" v-if="targetPerson && checkUserSuccess"></i>
                  <i class="fa fa-remove ml-3 fa-2x text-danger" v-if="targetPerson && checkUserSuccess === false"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <message-dialog id="message"
                    ref="messageDialog"></message-dialog>
  </div>
</template>
<script src="./audience-criteria.js"></script>
<style lang="scss" src="./audience-criteria.scss"></style>
