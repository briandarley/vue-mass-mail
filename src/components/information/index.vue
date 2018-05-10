<template>
  <div>
    <h6 class="text-primary">Mass E-mail is a tool for requesting and distributing official UNC-Chapel Hill messages. </h6>

    <p class="lead">
      This system provides support for mailing to predefined, broad sectors of the University community. Approved messages can be sent to all students, as well as to all employees. Some filtering is available to target specific subpopulations of recipients.
    </p>

    <div class="font-weight-bold">
      Things to know before creating a request:
    </div>
    <ul>
      <li>Review the <a href="https://help.unc.edu/help/mass-email-requirements/" target="_blank">Mass Email Requirements</a> for information about how the system works.</li>
      <li>Details on human subject research requirements, recycling old messages, and other questions can be found in the
      <a href="https://help.unc.edu/help/mass-e-mail-frequently-asked-questions/" target="_blank">Mass Email FAQ</a>.</li>
      <li>All requests must be approved and may be denied if there are concerns with the content or images. See the Appropriate Use section of the Mass Email Requirements for details.</li>
      <li>Message approval can take 1-3 days.</li>
    </ul>


    <p class="mt-5">
      To begin, choose <router-link to="create-request">Create Request</router-link> from the menu on the left.

    </p>


    <transition name="fade-h-o">
      <div class="form-inline form-group" v-if="massMailInProgress && massMailInProgress.length > 0">
        <div class="font-weight-bold">Select from the drop-down to edit an existing MassMail previously entered.</div>

        <div class="input-group">
          <select class="form-control" v-model="seletedMassMail">
            <option disabled value="">Select an Existing MassMail to edit</option>
            <option v-for="item of massMailInProgress" :value="item.id">{{item.id }} - {{item.subject}}</option>
          </select>
          <button class="btn btn-primary ml-1" @click="editMassMail" :disabled="!seletedMassMail">Go</button>
          <button class="btn btn-danger ml-1" @click="deleteMassMail" :disabled="!seletedMassMail">Delete</button>
        </div>
      </div>
    </transition>
    <button type="button" class="btn btn-labeled btn-primary text-light mt-4 mb-4 pull-right" @click="createRequest">
      <span class="btn-label "><i class="fa fa-newspaper-o"></i></span>Create New Request
    </button>


    <confirm-dialog id="confirmDelete"
                    ref="confirmDialog"></confirm-dialog>
  </div>



</template>
<script src="./index.js"></script>
<style lang="scss" src="./index.scss"></style>
