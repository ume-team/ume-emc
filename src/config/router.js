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
      meta: { title: '首页' },
      component: Dashboard,
      children: [
        {
          path: '/entity/search/:id',
          name: 'EntitySearch',
          meta: { title: '查询' },
          component: EntitySearch,
        },
        {
          path: '/entity/create/:id',
          name: 'EntityCreate',
          meta: { title: '新增' },
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
