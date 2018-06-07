import injector from 'vue-inject';

function sendMessageService(apiUrlBuilder, httpHandlerService, validationServices) {
  return {
    async send(messageId, recipients) {
      try {
        const handler = await httpHandlerService.get();
        const response = await handler.post(`messages/${messageId}/notifications`, recipients);
        return response.data;
      } catch (e) {

        throw e;
      }

    }
    
  }

}
injector.service('sendMessageService', ['apiUrlBuilder', 'httpHandlerService', 'validationServices'], sendMessageService);
