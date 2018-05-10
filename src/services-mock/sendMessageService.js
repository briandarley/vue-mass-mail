import injector from 'vue-inject';

function sendMessageService() {
  return {

    send(message) {
      return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, 1000);
      });
    }
    
    
  }

}
injector.service('sendMessageService', sendMessageService);
