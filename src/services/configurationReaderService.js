import injector from 'vue-inject';
import configuration from '../assets/configuration.json';


function configurationReaderService() {
  return {
    get() {
      return configuration;
    }
  }
}

injector.service('configurationReaderService', configurationReaderService);
