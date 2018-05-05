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
                    title="Confirm Save?"
                    message="The system would like to save your request at this time. The entry will be left in an incomplete status until fully completed alowing you to continue where you left at to resume entry."
                    ref="confirmDialog"
                    :declineResponse="onDeclineSave"
                    :confirmResponse="onConfirmSave"></confirm-dialog>
    <message-dialog id="message"
                    
                    ref="messageDialog"
                    ></message-dialog>
  </div>
</template>
<script>
  import Vue from "vue"
  import { Component, Prop, Watch } from "vue-property-decorator"
  import ConfirmDialog from '../common/dialogs/confirm-dialog';
  import MessageDialog from '../common/dialogs/message-dialog';
  import CreateRequestNav from '../common/nav/create-request-nav';
  @Component({
    name: 'create-request',
    dependencies: ['massMailSearchService', 'userService', 'toastService', 'spinnerService', '$', 'eventBus', 'childRouteService', 'dialogService'],
    components: { ConfirmDialog, CreateRequestNav, MessageDialog}
  })
  export default class CreateRequest extends Vue {
    @Prop() id;

    loaded = false;
    model = {
      isNew: true
    };


    //test() {
    //  console.log(this.massMailSearchService.model);
    //}
    nextChild() {
      return this.childRouteService.getNextChildRoute();
    }
    prevChild() {
      return this.childRouteService.getPreviousChildRoute();
    }

    next() {
      const $ = this.$;
      $(this.model).trigger("validate")
      


      if (this.model.errors.length > 0) {
        this.dialogService.initialize(this.$refs.messageDialog);
        this.dialogService.title = "Validation Errors";
        this.dialogService.message = `
          <h3 class="mr-2 text-warning d-inline-block"><i class="fa fa-exclamation-circle"></i> </h3>
          Validation errors detected on form. Please correct missing or invalid errors before proceeding.`;
        
        this.dialogService.show();

        return;
      }
      if (this.model.isNew && !this.model.saved) {
        this.toastService.warn("it's new!!!");
        this.massMailSearchService.save();

        this.model = this.massMailSearchService.model;
      }

      let childRoute = this.nextChild();

      if (!childRoute) {
        return;
      }
      if (this.id) {
        this.$router.push({ name: childRoute.name, params: { id: this.id } });
      } else {
        this.$router.push({ name: childRoute.name });
      }
    }

    previous() {
      let childRoute = this.prevChild();

      if (!childRoute) {
        return;
      }
      if (this.id) {
        this.$router.push({ name: childRoute.name, params: { id: this.id } });
      } else {
        this.$router.push({ name: childRoute.name });
      }

    }


    async loadMassMail() {
      this.model = this.massMailSearchService.model;

      if (!this.id) {
        return;
      }
      this.spinnerService.show();


      try {
        this.model = await this.massMailSearchService.getCurrentMassMailById(this.id);

        this.toastService.success("Successfully Retrieved Record");
      } catch (e) {
        console.log(e);
        this.toastService.error("Error retrieving current MassMail");
      }


      this.spinnerService.hide();
    }

    async mounted() {
      //child views are 'mounted' before parent is 'mounted'
    }
    addEventHandlers() {
      //global change notifier
      this.eventBus.eventBus.$on('model-changed', this.onModelChanged);

    }
    addControlBehavior() {
      const $ = this.$;

      $('[data-toggle="popover"]').popover();
    }

    onModelChanged(model) {
      //console.log(this.model);
      this.model = model;
      this.massMailSearchService.model = model;
      //console.log(this.model);

    }

    onDeclineSave() {
      //console.log("decline response");
    }
    onConfirmSave() {
      console.log("confirm response");
      //TODO retrieve and show ID
      this.toastService.success("MassMail successfully saved, the MassMail ID is ?????????????????");

    }

    bindKeyboardEvents() {
      let $ = this.$;

      $(document).keyup((e) => {
        if (e.which === 39) {
          this.next();
        }
        if (e.which === 37) {
          this.previous();
        }

      });
    }

    async created() {
      this.toastService.set(this);
      //called before child views are mounted
      this.addEventHandlers();
      this.addControlBehavior();
      this.massMailSearchService.clear();
      this.bindKeyboardEvents();

      await this.loadMassMail();
      this.loaded = true;

    }
    save() {

    }
    test() {
      let $ = this.$;

      
      $(this.model).trigger("validate")
      //$("#basic-information").validator();
      //$(this.massMailSearchService.model).trigger("validate")
    }
  }

</script>

<style scoped lang="scss">
  /*
   *https://vuejs.org/v2/guide/transitions.html
   *
   */
  .small-text {
    font-size: .7em;
  }


  .nav-request-nav {
    font-size: .8em;
  }
</style>
