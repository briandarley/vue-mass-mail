import Vue from "vue"
var moment = require("moment");

export default function formatDate(value) {
  const dt = new Date(value);
  return moment(dt).format("MM/DD/YYYY");
  //return numeral(value).format("0,0");
}


Vue.filter("formatDate", formatDate);
