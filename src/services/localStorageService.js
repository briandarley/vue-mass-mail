import injector from 'vue-inject';

  function localStorageService() {
  return {
    set: (param,value) => {
      localStorage.setItem("mass-mail: " + param, JSON.stringify(value));
    },
    get: (param) => {
      return JSON.parse(localStorage.getItem("mass-mail: " + param));
    },
    remove(param) {
      localStorage.removeItem("mass-mail: " + param);
    }

  }
}

injector.service('localStorageService', '', localStorageService);
