import Vue from 'vue';
import injector from 'vue-inject';
export const EventBus = new Vue();

function eventBusService($) {
  return {
    eventBus: EventBus
}

}

injector.service('eventBus', eventBusService);
