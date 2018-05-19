import injector from 'vue-inject';

function userService(configurationReaderService) {
  return {
    reviewers: [],
    get() {
      const defaultUser = configurationReaderService.get().defaultUser;
      const users = configurationReaderService.get().testUsers;
      return new Promise((result, reject) => {
        return result(users.find(c => c === defaultUser));
      });

    },
    getReviewers() {
      return new Promise((result, reject) => {
        setTimeout(() => {
          result(this.reviewers);
        },
          1000);
      });
    },
    addFavoriteReviewer(reviewer) {
      return new Promise((result, reject) => {
        this.reviewers.push(reviewer);
        return result();
      });
    },
    removeFavoriteReviewer(reviewer) {
      return new Promise((result, reject) => {

        var index = this.reviewers.indexOf(reviewer);
        this.reviewers.splice(index, 1);

        return result();
      });
    }
  }

}
injector.service('userService', ['configurationReaderService'], userService);
