import injector from 'vue-inject';

function massMailService(apiUrlBuilder, httpHandlerService, userService, moment, serviceEndpoint) {
  return {
    dataStore: [],
    recordHistory: [],
    model: {},

    clear() {
      this.initializeModel();
    },
    async getCurrentMassMailById(id) {
      const handler = await httpHandlerService.get();
      const responses = await Promise.all([handler.get(`messages/${id}`), handler.get(`messages/${id}/comments`)]);
      

      this.model = responses[0].data;

      const comments = responses[1].data;

      if (comments) {
        
        this.model.comments = comments
          .filter(c => c.commentTypeCode === "INITIAL_AUTH_COMMENT")
          .map(c => c.comment)[0];
      }

      
      return this.model;
    },
    async getRecords(criteria) {
      const handler = await httpHandlerService.get();

      let params = "";
      for (let property in criteria) {
        if (criteria.hasOwnProperty(property)) {
          params += `${property}=${criteria[property]}&`;
        }
      }
      params = params.replace(/\&$/, "");

      const responses = await handler.get(`messages?${params}`);
      
      return responses.data;


    },
    async getRecordComments(messageId) {
      const handler = await httpHandlerService.get();
      const responses = await handler.get(`messages/${messageId}/comments`);
      return responses.data;


    },
    async getRecordHistory(messageId) {
      const handler = await httpHandlerService.get();

      const nameMappingsRequest = handler.get(`actions/${messageId}/name-mappings`);
      const actionHistoryRequest = handler.get(`actions/${messageId}`);

      const data = await Promise.all([actionHistoryRequest, nameMappingsRequest]);
      
      const actionHistory = data[0].data;
      const nameMappings = data[1].data;

      const response = actionHistory.map(c => {

        var name = nameMappings.find(d => d.onyen === c.createUser).name;

        return Object.assign({ name: name }, { date: c.createDate, action: c.actionCode, user: c.createUser});

      });
      return response;
    },
    
    async delete(massMailId) {
      const handler = await httpHandlerService.get();
      const user = await userService.get();
      
      await handler.delete(`user-messages/${user.profile.name}/${massMailId}`);

    },
    async getCurrentMassMailByUser(user) {

      let pendingMessages = {
        data: { entities: [] }
      };
      try {
        const handler = await httpHandlerService.get();
        

        pendingMessages = await handler.get(`user-messages/${user.profile.sub}`);
        
      } catch (e) {
        if (e.message.indexOf("400") > -1) {
          return pendingMessages;
        }
        throw e;
      }
      
      return pendingMessages.data;

    },
    async save() {
      const handler = await httpHandlerService.get();


      if (!this.model.id) {
        const result = await handler.post("messages", this.model);
        this.model.id = result.data.id;
        this.model.author = result.data.author;
      } else {
        await handler.put("messages/" + this.model.id, this.model);
        
      }
      this.model.isNew = false;

    },

    async denyStudentsRequest(massMailId, comment) {
      const handler = await httpHandlerService.get();

      //DENIED_EMPLOYEES
      //DENIED_STUDENTS

      const model = {
        messageId: massMailId,
        actionCode: 'DENIED_STUDENTS',
        comment: comment
      };
      

      const result = await handler.put(`actions/${massMailId}`, model);
      return result;


    },
    async denyEmployeesRequest(massMailId, comment) {
      const handler = await httpHandlerService.get();

      //DENIED_EMPLOYEES
      //DENIED_STUDENTS

      const model = {
        messageId: massMailId,
        actionCode: 'DENIED_EMPLOYEES',
        comment: comment
      };


      const result = await handler.put(`actions/${massMailId}`, model);
      return result;


    },

    async approveStudentsRequest(massMailId) {
      const handler = await httpHandlerService.get();

      const model = {
        messageId: massMailId,
        actionCode: 'APPROVED_STUDENTS'
      };


      const result = await handler.put(`actions/${massMailId}`, model);
      return result;
    },

    async approveEmployeesRequest(massMailId) {
      const handler = await httpHandlerService.get();

      const model = {
        messageId: massMailId,
        actionCode: 'APPROVED_EMPLOYEES'
      };


      const result = await handler.put(`actions/${massMailId}`, model);
      return result;
    },

    initializeModel() {
      this.model = {
        isNew: true,
        sendDate: null,
        saved: false,
        priority: '',
        targetPopulation: '',
        targetEmployee: ''
      }
    },
    async submitForReview() {
      const handler = await httpHandlerService.get();

      const model = {
        messageId: this.model.id,
        actionCode: 'CREATED'
      };
      await handler.put(`actions/${this.model.id}`, model);
      return true;
    }


  }
}



injector.service('massMailService', ['apiUrlBuilder', 'httpHandlerService', 'userService', 'moment', 'serviceEndpoint'], massMailService);
