import injector from 'vue-inject';

function httpHandlerService(axios, serviceEndpoint, userService) {
  return {
   _httpHandler : null,
    async get() {
      const user = await userService.get();

      if (this._httpHandler) return this._httpHandler;

      const instance = axios.create({
        baseURL: serviceEndpoint,
        headers: { "Access-Control-Allow-Origin": "*", "Authorization": `Bearer ${user.access_token}` },
       
      });

      this._httpHandler = instance;

      return this._httpHandler;
    }
    
  }

}
injector.service('httpHandlerService', ['axios', 'serviceEndpoint', 'userService'], httpHandlerService);
