import injector from 'vue-inject';
import axios from 'axios';
import $ from 'jquery'
import moment from 'moment';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'




injector.constant('apiRoot', 'https://jsonplaceholder.typicode.com/posts/');
injector.constant('axios', axios);
injector.constant('users', ['rosalie', 'briordan', 'kmeason', 'maclay', 'dummy']);
injector.constant('defaultUser', 'rosalie');
injector.constant('$', $);
injector.constant('moment', moment);






