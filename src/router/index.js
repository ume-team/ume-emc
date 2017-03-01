import Vue from 'vue';
import Router from 'vue-router';
import EntitySearch from '@/components/EntitySearch';
import EntityCreate from '@/components/EntityCreate';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/entity/search/:id',
      name: 'EntitySearch',
      component: EntitySearch,
    },
    {
      path: '/entity/create/:id',
      name: 'EntityCreate',
      component: EntityCreate,
    },
  ],
});
