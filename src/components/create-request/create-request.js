import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import ConfirmDialog from '../common/dialogs/confirm-dialog.vue';
import MessageDialog from '../common/dialogs/message-dialog.vue';
import CreateRequestNav from '../common/nav/create-request-nav.vue';


@Component({
  name: 'create-request',
  dependencies: ['userService', 'toastService', 'spinnerService', '$', 'childRouteService', 'dialogService', 'eventBus', 'massMailService'],
  components: { ConfirmDialog, CreateRequestNav, MessageDialog }
})
export default class CreateRequest extends Vue {
  @Prop() id;
  user = null;
  loaded = false;
  model = {
    isNew: true
  };
  oldModel = {};

  copyModelObjec() {

    for (let k in this.model) {
      this.oldModel[k] = this.model[k];
    }

    delete this.oldModel.errors;
  }
  hasChanges() {
    if (this.model.isNew) return false;

    let _hasChanges = false;

    for (let k in this.model) {
      if (k === "errors") continue;
      if (this.oldModel[k] !== this.model[k]) {
        _hasChanges = true;
      }
    }

    return _hasChanges;


  }

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

    if (this.model.errors && this.model.errors.length > 0) {
      this._initializeValidationMessageDialog();

      this.dialogService.show();

      return;
    }

    if (this.model.isNew && !this.model.saved) {
      this.copyModelObjec();
      this._initializeConfirmFirstSaveDialog();
      this.dialogService.show();
      return;
    }

    if (this.hasChanges()) {
      this.copyModelObjec();
      this._initializeConfirmSubsequentSaveDialog();
      this.dialogService.show();
      return;
    }

    this.copyModelObjec();


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
    this.dialogService.confirmResponse = () => { };
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
  _initializeConfirmSubsequentSaveDialog() {
    this.dialogService.initialize(this.$refs.confirmDialog);
    this.dialogService.title = "Confirm Save?";
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-success d-inline-block"><i class="fa fa-exclamation-circle"></i> </h3>
          <span class="message">Changes were made to this request, Would you like to persist your changes?.</span>`;
    this.dialogService.confirmResponse = () => {
      this.save(this._navigateToNextRoute.bind(this), true, false);
    }
    this.dialogService.declineResponse = () => {
      this._navigateToNextRoute();
    }
  }
  _initializeConfirmFirstSaveDialog() {
    this.dialogService.initialize(this.$refs.confirmDialog);
    this.dialogService.title = "Confirm Save?"
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-success d-inline-block"><i class="fa fa-exclamation-circle"></i> </h3>
          <span class="message">The system would like to save your request at this time. The entry will be left in an incomplete status until fully completed allowing you to continue where you left at to resume entry.</span>`;
    this.dialogService.confirmResponse = this.save;
  }
  _initializeConfirmCompleteDialog() {


    this.dialogService.initialize(this.$refs.confirmDialog);
    this.dialogService.title = "Confirm Complete?";
    this.dialogService.message = `<div class="validation-error">
          <h3 class="mr-2 text-success d-inline-block"><i class="fa fa-exclamation-circle"></i> </h3>
          <div class="message">
            <p>Submit MassMail for Review?
              <br/>
              This request will be forwarded to the appropriate reviewers.</p>
            
          </div>`;
    this.dialogService.confirmResponse = this.onSubmitForReview;



  }

  async onSubmitForReview() {

    try {
      this.spinnerService.show();
      
      const success = await this.save(null, false,false);
      if (success) {
        await this.massMailService.submitForReview();
        this.toastService.success("Successfully submitted MassMail.");
        this.$router.push('/information/');
      }
      this.spinnerService.hide();

    } catch (e) {
      this.toastService.error("Failed to submit MassMail");
      
    }


  }

  async loadMassMail() {
    this.model = this.massMailService.model;
    this.copyModelObjec();

    if (!this.id) {
      return;
    }
    this.spinnerService.show();


    try {

      this.model = await this.massMailService.getCurrentMassMailById(this.id);
      this.copyModelObjec();
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
    //this.massMailSearchService.model = model;
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
    //this.massMailSearchService.clear();
    this.massMailService.clear();
    this.bindKeyboardEvents();
    await this.initializeUserProfile();
    await this.loadMassMail();
    this.loaded = true;

  }
  async save(fn, showToast, skipValidation) {
    this.spinnerService.show();

    const isNew = this.model.isNew;
    try {
      
      await this.massMailService.save(skipValidation);
      
      this.model = this.massMailService.model;

      this.model.isNew = false;

      let message = "MassMail successfully saved, the MassMail ID is " + this.model.id;
      if (isNew) {
        this._navigateToNextRoute();
      } else {
        message = "Successfully saved record";
       
      }
      if (showToast) {
        this.toastService.success(message);
      }
      return true;
    } catch (e) {
      
      console.log(e.response.data);
      if (e.response) {
        this.toastService.error("Failed to save Mass Mail record " + e.response.data.error);
      } else {
        this.toastService.error("Failed to save Mass Mail record");
      }
      
    
    }
    finally {
      if (fn && typeof fn === "function") {
        fn();
      }
      this.spinnerService.hide();
    }
    


  }




  submitForReview() {
    this._initializeConfirmCompleteDialog();
    this.dialogService.show();
  }


}
