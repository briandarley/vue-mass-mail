import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import ConfirmDialog from '../common/dialogs/confirm-dialog.vue';
import MessageDialog from '../common/dialogs/message-dialog.vue';
import CreateRequestNav from '../common/nav/create-request-nav.vue';


@Component({
  name: 'create-request',
  dependencies: ['massMailSearchService', 'userService', 'toastService', 'spinnerService', '$', 'childRouteService', 'dialogService', 'eventBus', 'massMailService'],
  components: { ConfirmDialog, CreateRequestNav, MessageDialog }
})
export default class CreateRequest extends Vue {
  @Prop() id;
  user = null;
  loaded = false;
  model = {
    isNew: true
  };



  nextChild() {
    return this.childRouteService.getNextChildRoute();
  }
  prevChild() {
    return this.childRouteService.getPreviousChildRoute();
  }
  previous() {
    const childRoute = this.prevChild();

    if (!childRoute) {
      return;
    }
    if (this.id) {
      this.$router.push({ name: childRoute.name, params: { id: this.id } });
    } else {
      this.$router.push({ name: childRoute.name });
    }

  }
  next() {
    const $ = this.$;
    $(this.model).trigger("validate");



    if (this.model.errors.length > 0) {
      this._initializeValidationMessageDialog();

      this.dialogService.show();

      return;
    }
    if (this.model.isNew && !this.model.saved) {
      this._initializeConfirmFirstSaveDialog();

      this.dialogService.show();

      return;



    }

    this._navigateToNextRoute();
  }

  _navigateToNextRoute() {
    const childRoute = this.nextChild();

    if (!childRoute) {
      return;
    }
    if (this.id) {
      this.$router.push({ name: childRoute.name, params: { id: this.id } });
    } else {
      this.$router.push({ name: childRoute.name });
    }
  }

  _initializeValidationMessageDialog() {
    this.dialogService.initialize(this.$refs.messageDialog);
    this.dialogService.title = "Validation Errors";
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-warning d-inline-block"><i class="fa fa-exclamation-triangle"></i> </h3>
          <span class="message">Validation errors detected on form. Please correct missing or invalid errors before proceeding.</span>
      </div>`;

  }
  _initializeModelErrorMessageDialog(id) {
    this.dialogService.initialize(this.$refs.messageDialog);
    this.dialogService.title = "Unable To Retrieve MassMail";
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-warning d-inline-block h1"><i class="fa fa-exclamation-triangle"></i> </h3>
           <span class="message">The service was unable to locate MassMail ${id}. <br/>
          The application will now redirect you to the information page where you may create a new request.</span>
      </div>`;
  }
  _initializeConfirmFirstSaveDialog() {
    this.dialogService.initialize(this.$refs.confirmDialog);
    this.dialogService.title = "Confirm Save?"
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-success d-inline-block"><i class="fa fa-exclamation-circle"></i> </h3>
          <span class="message">The system would like to save your request at this time. The entry will be left in an incomplete status until fully completed allowing you to continue where you left at to resume entry.</span>`;
    this.dialogService.confirmResponse = this.save;
  }




  async loadMassMail() {
    this.model = this.massMailService.model;

    if (!this.id) {
      return;
    }
    this.spinnerService.show();


    try {

      this.model = await this.massMailService.getCurrentMassMailById(this.id);
      
      this.toastService.success("Successfully Retrieved Record");
    } catch (e) {
      this._initializeModelErrorMessageDialog(this.id);
      this.dialogService.confirmResponse = () => {
        this.$router.push('/information/');
      };
      this.dialogService.show();

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
  async initializeUserProfile() {
    const user = await (this.userService.get());
    this.user = user.profile;

  }
  onModelChanged(model) {
    //console.log(this.model);
    this.model = model;
    this.massMailSearchService.model = model;
    this.massMailService.model = model;
    //console.log(this.model);

  }


  bindKeyboardEvents() {
    const $ = this.$;

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
    this.massMailService.clear();
    this.bindKeyboardEvents();
    await this.initializeUserProfile();
    await this.loadMassMail();
    this.loaded = true;

  }
  async save() {
    this.spinnerService.show();

    const isNew = this.model.isNew;
    try {
      if (!this.model.sendFrom) {
        this.model.sendFrom = "no_reply@unc.edu";
      }
      if (!this.model.replyTo) {
        this.model.replyTo = "no_reply@unc.edu";
      }

      //this.massMailService.model = this.model;


      await this.massMailService.save();

      this.model = this.massMailSearchService.model;

      if (isNew) {
        this._navigateToNextRoute();
        this.toastService.success("MassMail successfully saved, the MassMail ID is " + this.model.id);
      } else {
        this.toastService.success("Successfully saved record");
      }


    } catch (e) {
      console.log(e);
      this.toastService.error("Failed to save Mass Mail record");
    }

    this.spinnerService.hide();


  }
  test() {
    this.save();
    //let $ = this.$;


    //$(this.model).trigger("validate")
    //$("#basic-information").validator();
    //$(this.massMailSearchService.model).trigger("validate")
  }
}
