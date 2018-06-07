import injector from 'vue-inject';

function favoriteReviewerService(apiUrlBuilder, httpHandlerService, validationServices) {
  return {
    async addReviewer(email) {
      if (!validationServices.validateEmail(email)) {
        return await new Promise( (resolve,reject)  =>  {
          return reject("Invalid Email");
        });
      }
      try {
        const handler = await httpHandlerService.get();

        const response = await handler.post(`favorite-reviewers`, `"${email}"`);
        return response.data;
      } catch (e) {

        throw e;
      }



    },
    async deleteReviewer(email) {

      try {
        const handler = await httpHandlerService.get();
        const response = await handler.delete(`favorite-reviewers/${email}`);
        return response.data;
      } catch (e) {

        throw e;
      }



    },
    async getReviewers() {
      //mass-mail-audience/users/{id}

      try {
        const handler = await httpHandlerService.get();
        const response = await handler.get(`favorite-reviewers`);
        return response.data;
      } catch (e) {

        throw e;
      }


    }
  }

}
injector.service('favoriteReviewerService', ['apiUrlBuilder', 'httpHandlerService','validationServices'], favoriteReviewerService);
