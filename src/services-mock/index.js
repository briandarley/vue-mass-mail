import injector from 'vue-inject';
import "./massMailSearchService";
import "./userService";
import "./departmentSchoolLookupService";
import "./audienceCriteriaService";
import "./sendMessageService";
import "./departmentLookupService.js";
import "./administratorService.js";

function apiUrlBuilder(configurationReaderService) {
  return function (path) {
    const apiRoot = configurationReaderService.get().baseURL;
    
    return apiRoot + '/' + path;
  }
}

injector.factory('apiUrlBuilder', 'configurationReaderService', apiUrlBuilder);


