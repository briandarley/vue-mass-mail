import injector from 'vue-inject';
import axios from 'axios';
import $ from 'jquery'
import moment from 'moment';
import _ from 'lodash';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
import Configuration from '../assets/configuration.js';



injector.constant('axios', axios);
injector.constant('$', $);
injector.constant('moment', moment);
injector.constant('_', _);
injector.constant('serviceEndpoint', Configuration().getConfigurationSetting('serviceEndpoint'));
injector.constant('departmentAddress', Configuration().getConfigurationSetting('departmentsEndpoint'));






