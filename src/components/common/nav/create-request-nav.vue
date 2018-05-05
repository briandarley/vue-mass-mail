<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-sm-center">
  
    <ul class="nav navbar-nav">
  
      <li class="" v-for="navitem of routes()" v-bind:class="{active: navitem.name === $route.name}">
  
        <router-link class="nav-link" :to="routePath(navitem)">
          {{navitem.title}}
        </router-link>
      </li>
     
    </ul>
  
  </nav>
</template>
  <script>
    import Vue from "vue"
    import {Component ,Prop} from "vue-property-decorator"
    import Router from '../../../router/index';


@Component({
      name: 'create-request-nav',
      dependencies: ['childRouteService']
})
  export default class CreateRequestNav extends Vue{

    
    routes() {
      return this.childRouteService.getChildRoutes();
    }
    routePath(navitem) {
      return navitem.path.replace(/\/\:[a-zA-Z0-9]+\?$/, '');
    }


    
}

</script>
  <style lang="scss" scoped>
    @import "../../../assets/scss/variables";


    a
  {
    color: $athletics-navy;
  }

  li
{
  &:hover
  {
    border-bottom: 4px solid $carolina-blue;
    
    a
    {
      color:$carolina-blue !important;
    }
    
  }
}


.active
{
  border: 1px solid $link-blue !important;
  border-bottom: 4px solid $link-blue !important;

  a
  {
    color: $link-blue !important;
  }
}



  </style>

