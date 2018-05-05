import injector from 'vue-inject';

function audienceCriteriaService() {
  return {
    get() {
      return new Promise((result, reject) => {
        return result({
          ddd: 729,
          employees: 2843,
          students: 9157,

          allStudents: 30306,
          allEmployees: 27179
        });
      });

    },
    checkIfUserExists(user) {
      return new Promise((result, reject) => {
        const doesNotExits = ["a", "c", "e"];

        var val = true;
        doesNotExits.forEach(c => {
          if (user.startsWith(c)) {
            val = false;
          }
        });

        result(val);

      });
    }
  }

}
injector.service('audienceCriteriaService', audienceCriteriaService);
