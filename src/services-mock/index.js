import injector from 'vue-inject';

require("./massMailSearchService");
require("./userService");
require("./departmentSchoolLookupService");
require("./audienceCriteriaService");

function apiUrlBuilder(apiRoot) {
  return function (path) {
    return apiRoot + '/' + path;
  }
}

injector.factory('apiUrlBuilder', 'apiRoot', apiUrlBuilder);


