import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import PopOver from '../../../common/popover/popover';
import TypeAhead from '../../../common/type-ahead/type-ahead';
import CountUp from 'countup.js';


@Component({
  name: 'audience-criteria',
  dependencies: ['$', 'toastService', 'massMailSearchService', 'audienceCriteriaService'],
  components: { PopOver, TypeAhead }
})
export default class AudienceCriteria extends Vue {
  model = {

  };
  targetPerson = null;
  audienceSize = 0;
  checkUserSuccess = null;
  showEmployeeCriteria = false;


  async checkUser() {
    this.checkUserSuccess = false;
    if (!this.targetPerson || !await this.audienceCriteriaService.checkIfUserExists(this.targetPerson)) {
      return;
    }
    this.checkUserSuccess = true;
  }

  clearCheckUserStatus() {
    this.checkUserSuccess = null;
  }
  async calculateAudience() {
    this.showEmployeeCriteria = this._showEmployeeCriteria();
    this.audienceSize = 0;
    if (this.model.targetEmployee === "DDD") {
      this.audienceSize = await this._getCalculatedDddAudienceCount();
    } else {
      this.audienceSize = await this._getCalculatedTargetAudienceCount();
    }


    const easingFn = function (t, b, c, d) {
      const ts = (t /= d) * t;
      const tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
    };
    const options = {
      useEasing: true,
      easingFn: easingFn,
      useGrouping: true,
      separator: ',',
      decimal: '.',
    };

    const couter = new CountUp('targetAudience', 0, this.audienceSize, 0, 1.5, options);
    if (!couter.error) {
      couter.start();
    } else {
      console.error(couter.error);
    }
  }

  async _getCalculatedTargetAudienceCount() {

    let audienceSize, property;
    
    const prefix = this.model.priority === "Formal Notice" ? "all" : "";
    let upperCaseFirstLetter = false;
    if (prefix) {
      upperCaseFirstLetter = true;
    }

    const service = await this.audienceCriteriaService.get();


    switch (this.model.tagetPopulation) {

      case "Students":
        property = upperCaseFirstLetter ? prefix + "Students" : "students";
        audienceSize = service[property];
        break;
      case "Employees":
        property = upperCaseFirstLetter ? prefix + "Employees" : "employees";
        audienceSize = service[property];
        break;
      case "Employees and Students":
        property = upperCaseFirstLetter ? prefix + "Students" : "students";
        audienceSize = service[property];
        property = upperCaseFirstLetter ? prefix + "Employees" : "employees";
        audienceSize += service[property];
        break;
      default:
        audienceSize = 0;
    }

    return audienceSize;

  }

  _showEmployeeCriteria() {
    switch (this.model.tagetPopulation) {
      case "Employees":
      case "Employees and Students":
        return true;
      default:
        return false;
    }
  }

  async _getCalculatedDddAudienceCount() {
    if (this.model.tagetPopulation === "Testing Only") {
      return 0;
    }
    const service = await this.audienceCriteriaService.get();
    return service["ddd"];

  }

  async initializeAudienceSize() {

    const $ = this.$;
    this.audienceSize = 0;
    if (this.model.targetEmployee === "DDD") {
      this.audienceSize = await this._getCalculatedDddAudienceCount();
    } else {
      this.audienceSize = await this._getCalculatedTargetAudienceCount();
    }

    $("#targetAudience").html(this.audienceSize);
  }

  async mounted() {
    this.toastService.set(this);
    

    this.model = this.massMailSearchService.model;
    this.showEmployeeCriteria = this._showEmployeeCriteria();

    this.initializeAudienceSize();
    //targetAudience
  }

}
