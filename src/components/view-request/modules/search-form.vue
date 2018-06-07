<template>
  <fieldset >
    <legend>Search Messages</legend>
    <div class="row">
      <div class="col-md-8  form-group">
        <label class="mr-2">Filter</label>
        <div class="input-group-append ">
          <input type="text" class="form-control col-10" v-model="textFilter" placeholder="Request Id, Onyen, First Name, Last Name, Subject" @keydown="clearSearchRequest" />
          <span class="input-group-text" @click="textFilter = ''"><i class="fa fa-remove"></i></span>
        </div>
        </div>
        <div class="col form-group">

          <label class="mr-2">Status</label>
          <select class="form-control" v-model="status" @change="statusChanged">
            <option value="CREATED">Needs Review</option>
            <!--<option value="RUNNING_TONIGHT">Running Tonight</option>-->
            <option value="PENDING">Pending/Expired</option>
            <option value="FAILED">Failed/Needs Review</option>
            <option value="SAVED">Saved</option>
            <option value="ARCHIVE">Archive</option>
            <option value="ALL">All Records</option>
          </select>

        </div>
      </div>
  </fieldset>
</template>
<script src="./search-form.js"></script>
<style lang="scss" src="./search-form.scss"></style>
