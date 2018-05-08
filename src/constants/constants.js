import injector from 'vue-inject';
import axios from 'axios';
import $ from 'jquery'
import moment from 'moment';
import _ from 'lodash';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'



injector.constant('axios', axios);
injector.constant('$', $);
injector.constant('moment', moment);
injector.constant('_', _);






