import injector from 'vue-inject';
import jsonCurrentPendingMassMail from '../mock-data/allMassMailRecords.json';
import jsonRecordHistory from '../mock-data/recordHistory.json';
function massMailSearchService(apiUrlBuilder, axios, userService, moment) {
  return {
    dataStore: [],
    recordHistory: [],
    model: {},

    clear() {
      this.initializeModel();
    },

    getCurrentMassMailById(id) {
      this._initializeLocalStore();
      const dataStore = this.dataStore.slice();
      return new Promise((result, reject) => {

        setTimeout(() => {
          try {
            const response = dataStore.find(item => parseInt(item.id) === parseInt(id));
            this.model = response;
            this.model.isNew = false;


            return result(this.model);
          } catch (e) {
            console.log(e);
            reject("Unable to find record");
          }
        }, 1000);
      });
    },
    getCurrentMassMailByUser(user) {
      this._initializeLocalStore();


      return new Promise((result, reject) => {

        setTimeout(() => {

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


        if (!criteria) {
          criteria = { index: 0, pageSize: 10, status: 'Needs Review' };
        }

        const start = criteria.index * criteria.pageSize;

        let records = this.dataStore.slice();


        switch (criteria.status) {
          case 'Needs Review':
            records = records
              .filter(c =>
                c.status.toUpperCase().indexOf("PENDING") > -1
                && !moment().isAfter(c.expirationDate + 'Z')
              ).slice();


            break;
          case 'Pending/Expired':
            records = records
              .filter(c => c.status.toUpperCase().indexOf("PENDING") > -1
                && moment().isAfter(c.expirationDate + 'Z')
              ).slice();

            break;
          case 'Running Tonight':
            records = records
              .filter(c => {

                if (!(c.status.toUpperCase().indexOf("PENDING") === -1 ||
                  c.status.toUpperCase().indexOf("SENT") === -1 ||
                  c.status.toUpperCase().indexOf("CANCELED") === -1)) {
                  return false;
                }
                var nowDt = new Date().toDateString();
                  
                var dt = new Date(c.expirationDate);
                var dFuture = new Date(dt.setDate(dt.getDate())).toDateString();
                  
                  
                return (nowDt === dFuture); 


              }

            ).slice();
            break;
          case 'Failed/Needs Review':
            records = records
              .filter(c => {

                  if (c.status.toUpperCase().indexOf("APPROVED") === -1 ||
                    c.status.toUpperCase().indexOf("SENT") > -1 ||
                    c.status.toUpperCase().indexOf("PENDING") > -1 ||
                    c.status.toUpperCase().indexOf("CANCELED") > -1) {
                    return false;
                  }
                  var nowDt = new Date().toDateString();

                  var dt = new Date(c.expirationDate);
                  var dFuture = new Date(dt.setDate(dt.getDate())).toDateString();


                  return (nowDt > dFuture);


                }

              ).slice();
            break;
          case 'Archive':
            records = records
              .filter(c => {

                  //if (c.status.toUpperCase().indexOf("APPROVED") === -1 ||
                  //  c.status.toUpperCase().indexOf("SENT") > -1 ||
                  //  c.status.toUpperCase().indexOf("PENDING") > -1 ||
                  //  c.status.toUpperCase().indexOf("CANCELED") > -1) {
                  //  return false;
                  //}
                  var nowDt = new Date().toDateString();

                  var dt = new Date(c.expirationDate);
                  var dFuture = new Date(dt.setDate(dt.getDate())).toDateString();


                  return (nowDt > dFuture);


                }

              ).slice();
            break;
          default:
        }





        //select
        //--SUBSTRING(t.content, 0, 10) content
        //t.*
        //  from #tmp2 t
        //where
        //status like '%approved%'
        //and status not like '%pending%'
        //and status not like '%sent%'
        //order by id desc






        if (criteria.textFilter) {
          criteria.textFilter = criteria.textFilter.trim();
          if (criteria.textFilter.match(/^\d+$/)) {
            records = records.filter(c => parseInt(c.id) === parseInt(criteria.textFilter));
          }
          else {
            const rec1 = records.filter(c => c.subject.toUpperCase().indexOf(criteria.textFilter.toUpperCase()) > -1);
            const rec2 = records.filter(c => c.author.toUpperCase().startsWith(criteria.textFilter.toUpperCase()));

            records = rec1.concat(rec2);
          }
        }





        setTimeout(() => {
          return result({
            records: records
              .slice(start, start + criteria.pageSize)
              .sort((a, b) => { return a.id < b.id; }),
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
      const author = await userService.get();

      return await new Promise((result, reject) => {

        setTimeout(() => {
          this.model.author = author.profile.name;
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
        targetPopulation: '',
        targetEmployee: ''
      }
    },

    _generateId() {
      return Math.floor(Math.random() * 10000) + 9000;
    }
  }
}



injector.service('massMailSearchService', ['apiUrlBuilder', 'axios', 'userService', 'moment'], massMailSearchService);
