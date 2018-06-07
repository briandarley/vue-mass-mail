import configuration from './configuration.json';
import configurationLocal from './configuration.local.json';
import configurationDevelopment from './configuration.development.json';
import configurationTest from './configuration.test.json';
import configurationProduction from './configuration.production.json';

export default function() {

  return {
    getEnvironment() {
      return configuration.environment;
    },
    getConfiguration() {
      switch (configuration.environment) {
      case "local":
          return configurationLocal;
      case "test":
          return configurationTest;
      case "development":
          return configurationDevelopment;
      case "production":
          return configurationProduction;
        default:
          throw "Environment not found or not supported configuration.js line 24";
      }
    },
    getConfigurationSetting(key) {
      return this.getConfiguration()[key];
    }

  }
}
