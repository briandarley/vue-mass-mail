import injector from 'vue-inject';
import "./userService";
import './massMailService';
import './httpHandlerService';
import './audienceCriteriaService';
import './favoriteReviewerService';
import "./sendMessageService";
import "./administratorService";




function apiUrlBuilder(configurationReaderService) {
  return function (path) {
    const apiRoot = configurationReaderService.get().baseURL;

    return apiRoot + '/' + path;
  }
}

injector.factory('apiUrlBuilder', 'configurationReaderService', apiUrlBuilder);


