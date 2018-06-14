import Vue from "vue"
var moment = require("moment");

export default function formatDateTime(value) {
  const dt = new Date(value);
  return moment(dt).format("MM/DD/YYYY, h:mm a");
  
}


Vue.filter("formatDateTime", formatDateTime);
