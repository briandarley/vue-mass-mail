import injector from 'vue-inject';


function dialogService() {
  return {
    dialog: null,
    title: '',
    message: '',
    confirmResponse: () => { },
    declineResponse: () => { },
    show: () => {
      
      this.dialog.show();
    },
    hide: () => {
      this.dialog.hide();
    },
    initialize: (dialog) => {
      this.dialog = dialog;
      this.title = '';
      this.message = '';
      this.confirmResponse = () => { };
      this.declineResponse = () => {};
    }

  }
}

injector.service('dialogService', dialogService);
