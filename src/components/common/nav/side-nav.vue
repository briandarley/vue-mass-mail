<template>
  <ul class="nav flex-column">
  


    <li class="nav-item" v-for="navitem of routes()" v-bind:class="{active: navitem.path === $route.matched[0].path}">
  
 
      <router-link class="nav-link" :to="routePath(navitem)">
        <i class="fa pr-1" v-bind:class="navitem.icon"></i> {{navitem.title}}
      </router-link>
    </li>
  
  </ul>
</template>
<script>
  import Vue from "vue"
  import {Component ,Prop} from "vue-property-decorator"
  import Router from '../../../router/index';

  @Component({})
  export default class SideNav extends Vue{
    

    routes() {
      return Router.options.routes.filter((navitem) => {
        return navitem.path !== "*" && navitem.navigable !== false;
      });
    }
    routePath(navitem) {
      return navitem.path.replace(/\/\:[a-zA-Z0-9]+\?$/, '');
    }
   
  

 
}

</script>
<style lang="scss">
  @import "../../../assets/scss/variables";
  
  
.nav-item .active
{
  background: $link-blue;

}

  .nav-item {
      font-size: .8em;
      &:hover{
        background: $carolina-blue;
      }

      &:hover a {
        color: $white;
      }

      &.active {
        background: $link-blue;
      }

      &.active a {
        color: $white;
      }
    }
</style>
