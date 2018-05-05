import injector from 'vue-inject';
import json from '../mock-data/currentSchoolDepartmentList.json'
function departmentSchoolLookupService(apiUrlBuilder, axios) {
  return {
    getAllSchoolsDepartments() {
      return new Promise((result, reject) => {
        //setTimeout(() => { return reject("TEST")}, 4000);
        setTimeout(() => { return result(json); }, 150);
      });
    },
    //Signature for typeahead api
    //https://github.com/twitter/typeahead.js/blob/master/doc/jquery_typeahead.md#features
    getSchoolsDepartmentsLike(query, syncResults, asyncResults) {
      

      return new Promise((result, reject) => {
        setTimeout(() => {
          
          result(asyncResults(
            json.filter(item => item.name.toUpperCase().includes(query.toUpperCase())).map(c=> c.name)

          ));
          
        }, 250);
      });
    }
  }
}
injector.service('departmentSchoolLookupService', ['apiUrlBuilder', 'axios'], departmentSchoolLookupService);
