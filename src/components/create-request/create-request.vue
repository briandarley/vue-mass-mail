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
      <div class="col">
        <a href="javascript:void(0);" class="btn btn-primary" @click="previous" :class="{'btn-secondary disabled': prevChild()==null}"><i class="fa fa-chevron-left"></i> </a>
      </div>
      <div class="col">
        <div class="col text-center">

          <a href="javascript:void(0);" type="button" class="btn btn-labeled btn-light text-dark" v-if="nextChild()!==null && !model.isNew" @click="save">
            <span class="btn-label "><i class="fa fa-save"></i></span> Save
          </a>
        </div>
      </div>
      <div class="col">
        <a href="javascript:void(0);" type="button" class="btn btn-labeled btn-primary text-light float-right" v-if="nextChild()==null">
          <span class="btn-label "><i class="fa fa-paper-plane"></i></span> Complete
        </a>
        <a href="javascript:void(0);" class="btn btn-primary float-right" @click="next" v-if="nextChild()!==null"><i class="fa fa-chevron-right"></i> </a>

      </div>

    </div>
    <!--<button class="btn btn-primary" @click="test">Test </button>-->

    <confirm-dialog id="confirmSave"
                    ref="confirmDialog"></confirm-dialog>
    <message-dialog id="message"
                    ref="messageDialog"></message-dialog>
  </div>
</template>
<script src="./create-request.js"></script>
<style lang="scss" src="./create-request.scss" scoped></style>
