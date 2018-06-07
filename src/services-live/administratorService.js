import injector from 'vue-inject';

function administratorService(apiUrlBuilder, httpHandlerService, userService, moment, serviceEndpoint, departmentLookupService) {


  return {
    async getUsers() {
      const handler = await httpHandlerService.get();
      const responses = await handler.get(`accounts`);
      return responses.data;
    },
    async getUser(onyen) {
      const handler = await httpHandlerService.get();
      const responses = await handler.get(`accounts/${onyen}`);
      return responses.data;
    },
    async addUser(model) {
      const handler = await httpHandlerService.get();
      const responses = await handler.post(`accounts`, model);
      return responses.data;
    },
    async deleteUser(userId) {
      const handler = await httpHandlerService.get();
      const responses = await handler.delete(`accounts/${userId}`);
      return responses.data;
    },
    async updateUser(model) {
      const handler = await httpHandlerService.get();
      
      const responses = await handler.put(`accounts/${model.onyen}`, model);
      return responses.data;
    },
    async getRoles() {
      const handler = await httpHandlerService.get();
      const dt = Date.now();
      const responses = await handler.get(`accounts/roles?${dt}`);
      return responses.data;
    },
    async addRole(value) {
      const handler = await httpHandlerService.get();
      const responses = await handler.post(`accounts/roles`, {name: value});
      return responses.data;
    },
    async updateRole(value) {
      const handler = await httpHandlerService.get();
      const responses = await handler.put(`accounts/roles/${value.id}`, value);
      return responses.data;
    },
    async deleteRole(id) {
      const handler = await httpHandlerService.get();
      const responses = await handler.delete(`accounts/roles/${id}`);
      return responses.data;
    },
    async removeAssignedDepartment(onyen, departmentId) {
     
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

    },
    
    
  } 

}
injector.service('administratorService', ['apiUrlBuilder', 'httpHandlerService', 'userService', 'moment', 'serviceEndpoint', 'departmentLookupService'], administratorService);
