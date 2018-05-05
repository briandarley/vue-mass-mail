import injector from 'vue-inject';
import router from '../router'

function childRouteService() {
  return {
    


    getChildRoutes() {

      

      
      //Router
      var allRoutes = [];

      //weird, vue doesn't let you access child routes from current route (this.route
      router.options.routes.forEach((nav) => {
        if (nav.children && nav.children.some(c => c.name === router.currentRoute.name)) {
          allRoutes = nav.children.filter(c => c.name);
        }

      });


      return allRoutes;

    },
    getNextChildRoute() {
      const childRoutes = this.getChildRoutes();

      
      let foundCurrentRoute = false;
      for (let i = 0; i < childRoutes.length; i++) {

        if (foundCurrentRoute) {
          return childRoutes[i];
        }
        
        if (childRoutes[i].name === router.currentRoute.name) {
          foundCurrentRoute = true;
        }
        
      }

      //we're at the end, no other routes
      return null;
      
    },

    getPreviousChildRoute() {
      const childRoutes = this.getChildRoutes();
      
      
      for (let i = 0; i < childRoutes.length; i++) {
        
        if (childRoutes[i].name === router.currentRoute.name) {
          if(i > 0) {
            return  childRoutes[i-1];
          }

          return null;
        }
        
      }

      
      return null;

    }


    //navitem.name === $route.name
  }
}

injector.service('childRouteService', childRouteService);
