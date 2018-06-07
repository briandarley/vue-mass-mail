import injector from 'vue-inject';
import configuration from '../assets/configuration.js';


function configurationReaderService() {
  return {
    get() {
      return configuration().getConfiguration();
    }
  }
}

injector.service('configurationReaderService', configurationReaderService);
