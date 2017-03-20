import Login from '@/component/Login';
import Dashboard from '@/component/Dashboard';
import EntitySearch from '@/component/entity/EntitySearch';
import EntityCreate from '@/component/entity/EntityCreate';
import GenerateRoute from './generate_route';

export default {
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: { auth: false },
      component: Login,
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
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
      ].concat(GenerateRoute),
    },
  ],
};
