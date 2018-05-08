import injector from 'vue-inject';
import jsonCurrentPendingMassMail from '../mock-data/currentPendingMassMail.json'
import jsonRecordHistory from '../mock-data/recordHistory.json'
function massMailSearchService(apiUrlBuilder, axios, userService,moment) {
  return {
    dataStore: [],
    recordHistory: [],
    model: {},
    
    clear() {
      this.initializeModel();
    },
    _formatDt(dt) {
      if (!dt) return null;
      return moment().utc(dt).format('MM/DD/YYYY');
    },
    getCurrentMassMailById(id) {
      this._initializeLocalStore();
      const dataStore = this.dataStore;
      return new Promise((result, reject) => {
           //setTimeout(() => { return reject("TEST")}, 4000);
        setTimeout(() => {
          try {
            const response = dataStore.find(item => parseInt(item.id) === parseInt(id));
            this.model = response;
            this.model.isNew = false;
            this.model.sendDate = this._formatDt(response.sendDate);
            this.model.expirationDate = this._formatDt(response.expirationDate);
            

            return result(this.model);
          } catch (e) {
            console.log(e);
            reject("Unable to find record");
          } 
          },1000);
      });
    },
    getCurrentMassMailByUser(user) {
      this._initializeLocalStore();
      

      return new Promise((result, reject) => {

        setTimeout(() => {

            this.dataStore.forEach(entity => {
              entity.sendDate = this._formatDt(entity.sendDate);
              entity.expirationDate = this._formatDt(entity.expirationDate);
            });

            return result(



                this.dataStore.filter(item => item.author === user)

              );
        },
        1000);
    });
    },
    getRecords(criteria) {
      this._initializeLocalStore();


      return new Promise((result, reject) => {

        this.dataStore.forEach(entity => {
          entity.sendDate = this._formatDt(entity.sendDate);
          entity.expirationDate = this._formatDt(entity.expirationDate);
        });

        if (!criteria) {
          criteria = { index: 0, pageSize: 10 };
        }

        const start = criteria.index * criteria.pageSize;

        let records = this.dataStore.slice();

        if (criteria.textFilter) {
          criteria.textFilter = criteria.textFilter.trim();
          if (criteria.textFilter.match(/^\d+$/)) {
            records = records.filter(c => parseInt(c.id) === parseInt(criteria.textFilter));
          }
          else {
            let rec1 = records.filter(c => c.subject.toUpperCase().indexOf(criteria.textFilter.toUpperCase()) > -1);
            let rec2 = records.filter(c => c.author.toUpperCase().startsWith(criteria.textFilter.toUpperCase()));

            records = rec1.concat(rec2);
          }
        }


        
        setTimeout(() => {
          return result({
            records: records.slice(start, start + criteria.pageSize),
            totalRecords: records.length

          });
          },
          1000);
      });
    },
    _initializeLocalStore() {
      if (this.dataStore.length === 0) {
        this.dataStore = jsonCurrentPendingMassMail;
        this.recordHistory = jsonRecordHistory;
      }
    },
    getRecordHistory(id) {

      return new Promise((result, reject) => {
        setTimeout(() => {
            return result(this.recordHistory);
          },
          1000);

      });


    },
    delete(id) {
      return new Promise(result => {
        var item = this.dataStore.find(item => item.id === id);
        var index = this.dataStore.indexOf(item);
        this.dataStore.splice(index, 1);
        result();
      });
    },
    

    async save() {
      const auther = await userService.get();
      
      return await new Promise((result, reject) => {
        
        setTimeout(() => {
            this.model.author = auther;
            this.model.id = this._generateId();
            this.model.saved = true;
            this.dataStore.push(this.model);
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



injector.service('massMailSearchService', ['apiUrlBuilder', 'axios','userService','moment'], massMailSearchService);
