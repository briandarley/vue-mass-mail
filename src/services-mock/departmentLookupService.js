import injector from 'vue-inject';
import json from '../mock-data/departments.json';

function departmentLookupService() {
  return {
    async get() {
      return new Promise((result, reject) => {
        setTimeout(() => {

          result(json.resultObj);

        }, 1000);
      });
    },
    getById(id) {
      return new Promise((result, reject) => {
        const department = json.resultObj.slice().find(item => item.deptId === id);
        
        setTimeout(() => {
          if (!department) {
            return reject(`Department ${id} not found`);
          }
          return result({ id: department.deptId, name: department.descr });

        }, 250);
      });
    },
  }
}

injector.service('departmentLookupService', departmentLookupService);


