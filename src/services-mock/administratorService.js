import injector from 'vue-inject';
import roleJson from '../mock-data/applicationRoles.json';
import departmentJson from '../mock-data/departments.json';

function administratorService(userService, departmentLookupService) {


  return {
    assignedDepartments: [],

    getRoles() {
      return new Promise((resolve, reject) => {
        return resolve(roleJson);
      });
    },
    async removeAssignedDepartment(onyen, departmentId) {
      return new Promise(async (resolve, reject) => {


        const entity = this.assignedDepartments.find(c => c.userId === onyen && c.departmentNumber === departmentId);

        const index = this.assignedDepartments.indexOf(entity);

        setTimeout(() => {
          this.assignedDepartments.splice(index, 1);
          return resolve();
        },
          250);



      });
    },
    async addAssignDepartment(onyen, departmentId) {

      return new Promise(async (resolve, reject) => {

        const department = await departmentLookupService.getById(departmentId);
        const model = { userId: onyen, departmentNumber: department.id };

        if (this.assignedDepartments.some(c => c.departmentNumber === department.id)) {
          return reject("Department already assigned to user");
        }

        this.assignedDepartments.push(model);

        return resolve(model);

      });

    },
    async getAssignedDepartments(onyen) {

      return new Promise(async (resolve, reject) => {
        const assignedDepartments = this.assignedDepartments.filter(c => c.userId === onyen);

        const result = assignedDepartments.slice().map(c => {
          const entity = departmentJson.resultObj.find(d => d.deptId === c.departmentNumber);
          return { id: entity.deptId, name: entity.descr };
        });


        await setTimeout(() => { return resolve(result) }, 250);

      });

    }
  }

}
injector.service('administratorService', ['userService', 'departmentLookupService'], administratorService);
