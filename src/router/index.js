import Vue from 'vue'
import Router from 'vue-router'
import user_list from '../views/user/user-list'
import user_item from '../views/user/user-item'

import service_list from '../views/service/service-list'
import service_item from '../views/service/service-item'

import district_list from '../views/district/district-list'
import district_item from '../views/district/district-item'

import template_list from '../views/template/template-list'
import template_item from '../views/template/template-item'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user-list',
      component: user_list
    },


    {
      path: '/user',
      name: 'user-list',
      component: user_list
    },
    {
      path: '/user_item',
      name: 'user-item',
      component: user_item
    },



    {
      path: '/service/:id',
      name: 'service-list',
      component: service_list
    },
    {
      path: '/service_item',
      name: 'service-item',
      component: service_item
    },


    {
      path: '/district/:id',
      name: 'district-list',
      component: district_list
    },
    {
      path: '/district_item',
      name: 'district-item',
      component: district_item
    },



    {
      path: '/template',
      name: 'template-list',
      component: template_list
    },
    {
      path: '/template_item',
      name: 'template-item',
      component: template_item
    }


  ]
})
