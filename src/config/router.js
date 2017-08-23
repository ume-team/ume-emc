import Dashboard from '@/component/Dashboard';
import Login from '@/component/Login';
import PageNotFound from '@/component/PageNotFound';
import EntityCreate from '@/component/entity/EntityCreate';
import EntitySearch from '@/component/entity/EntitySearch';

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
      ],
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
};
