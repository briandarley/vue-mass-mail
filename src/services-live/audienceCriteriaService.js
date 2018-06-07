import injector from 'vue-inject';

function audienceCriteriaService(apiUrlBuilder, httpHandlerService) {
  return {
    async get() {
      
      try {
        const handler = await httpHandlerService.get();
        const response = await handler.get(`mass-mail-audience`);
        return response.data;
      } catch (e) {
      
        throw e;
      }

      

    },
    async checkIfUserExists(user) {
      //mass-mail-audience/users/{id}

      try {
        const handler = await httpHandlerService.get();
        const response = await handler.get(`mass-mail-audience/users/${user}`);
        return response.data;
      } catch (e) {

        throw e;
      }

      
    }
  }

}
injector.service('audienceCriteriaService', ['apiUrlBuilder', 'httpHandlerService'],audienceCriteriaService);
