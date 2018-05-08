<template>
  <div id="create-request">
    <!--<button class="btn btn-primary" @click="test">Test</button>-->
    <h6 v-if="model.isNew" class="text-primary">Create Request</h6>
    <h6 v-else>Edit Request {{model.id}} - {{model.subject}}</h6>

    <create-request-nav class="nav-request-nav"></create-request-nav>

    <div id="create-request-child">
      <transition name="fade">
        <router-view v-if="loaded" />
      </transition>
    </div>
    <!--<button class="btn btn-danger" @click="test">Test </button>-->

    <div class="row mt-5">
      <div class="col-sm-12">
        <a href="javascript:void(0);" class="btn btn-primary" @click="previous" :class="{'btn-secondary disabled': prevChild()==null}"><i class="fa fa-chevron-left"></i> </a>
        <a href="javascript:void(0);" class="btn btn-primary float-right" @click="next" :class="{'btn-secondary disabled': nextChild()==null}"><i class="fa fa-chevron-right"></i> </a>
      </div>
    </div>


    <confirm-dialog id="confirmSave"
                    ref="confirmDialog"></confirm-dialog>
    <message-dialog id="message"
                    ref="messageDialog"></message-dialog>
  </div>
</template>
<script src="./create-request.js"></script>
<style lang="scss" src="./create-request.scss" scoped></style>
