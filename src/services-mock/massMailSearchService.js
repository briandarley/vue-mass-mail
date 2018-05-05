import injector from 'vue-inject';
import json from '../mock-data/currentPendingMassMail.json'
function massMailSearchService(apiUrlBuilder, axios) {
  return {
    model: {},
    
    clear() {
      this.initializeModel();
    },

    getCurrentMassMailById(id) {
      
      return new Promise((result, reject) => {
           //setTimeout(() => { return reject("TEST")}, 4000);
        setTimeout(() => {
            var response = json.find(item => item.id === id);
            this.model = response;
            this.model.isNew = false;
          
          return result(this.model);
          },1000);
      });
    },
    getCurrentMassMailByUser(user) {
      //var url = apiUrlBuilder(path);
      //return axios.get(url);

      return new Promise((result, reject) => {
          setTimeout(() => {
              return result(json.filter(item => item.author === user));
        },
        1000);
    });
    },

    delete(id) {
      return new Promise(result => {
        var item = json.find(item => item.id === id);
        var index = json.indexOf(item);
        json.splice(index, 1);
        result();
      });
    },
    

    save() {
      return new Promise((result, reject) => {
        
        setTimeout(() => {
            this.model.id = this._generateId();
            this.model.saved = true;
            return result();
          },
          1000);
      });
    },

    initializeModel() {
      this.model = {
          isNew: true,
          sendDate: null,
          saved: false,
          priority: '',
        tagetPopulation: '',
          targetEmployee: ''
      }
    },

    _generateId() {
      return Math.floor(Math.random() * 10000) + 9000;
    }
  }
}



injector.service('massMailSearchService', ['apiUrlBuilder', 'axios'], massMailSearchService);
