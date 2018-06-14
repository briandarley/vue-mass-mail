import Vue from "vue"
var moment = require("moment");

export default function formatTime(value) {
  const dt = new Date(value);
  return moment(dt).format("h:mm a");
  
}


Vue.filter("formatTime", formatTime);
