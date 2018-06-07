import Vue from 'vue'
import Router from 'vue-router'
import Information from '@/components/information/index.vue'
import CreateRequest from '@/components/create-request/create-request.vue'
import BasicInformation from '@/components/create-request/steps/basic-information/basic-information.vue';
import AudienceCriteria from '@/components/create-request/steps/audience-criteria/audience-criteria.vue';
import MessageContents from '@/components/create-request/steps/message-contents/message-contents.vue';
import MessageSummary from '@/components/create-request/steps/message-summary/message-summary.vue';
import TemplateSelection from '@/components/create-request/steps/template-selection/template-selection.vue';
import ViewRequest from '@/components/view-request/view-request.vue';

import CallBack from '@/components/login/call-back.vue';


//import Archives from '@/components/archives/index'
import Administration from '@/components/administration/administration.vue'



Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/call-back',
      name: 'CallBack',
      title: 'Call Back',
      component: CallBack,
      icon: 'fa-unlock',
      navigable: false
    },
    {
      path: '/information',
      name: 'Information',
      title: 'Information',
      component: Information,
      icon: 'fa-info-circle',
      
      
    },
    {
      //name: 'create-request',
      path: '/create-request/:id?',
      title: 'Create Request',
      component: CreateRequest,
      props: true,
      icon: 'fa-envelope',
      children: [
        {
          name: 'basic-information',
          path: 'basic-information',
          title: 'Basic Information',
          component: BasicInformation
        },
        {
          name: 'audience-criteria',
          path: 'audience-criteria',
          title: 'Audience Criteria',
          component: AudienceCriteria
        },
        //{
        //  name: 'template-selection',
        //  path: 'template-selection',
        //  title: 'Template Selection',
        //  component: TemplateSelection
        //},
        {
          name: 'message-contents',
          path: 'message-contents',
          title: 'Message Contents',
          component: MessageContents
        },
        {
          name: 'message-summary',
          path: 'message-summary',
          title: 'Message Summary',
          component: MessageSummary
        },
        {
          path: '/',
          redirect: '/create-request/:id?/basic-information',
          component: BasicInformation
        }

      
      
        //{
        //  path: '/',
        //  component: BasicInformation,
        //  name: 'create-request:basic-information',

        //}

      ]
      
    },
    {
      path: '/view-request',
      name: 'view-request',
      title: 'View Request',
      component: ViewRequest,
      icon: 'fa-search'
      

    },
    //{
    //  path: '/archives',
    //  name: 'archives',
    //  title: 'Archives',
    //  component: Archives,
    //  icon: 'fa-archive'
      

    //},
    {
      path: '/administration',
      name: 'administration',
      title: 'Administration',
      component: Administration,
      icon: 'fa-user-secret',
      role: ['admin']
      

    },
    {
      path: '*',
      //name: 'information',
      //redirect: '/information',
      component: Information
      

    },

  ]
    
  
  
  

});

router.beforeEach((to, from, next) => {
  
  router.currentRouteName = to.Name;
  next();
});



//router.replace({ path: '', redirect: '/' })
export default router
