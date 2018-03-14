import Dashboard from '@/component/Dashboard';
import Login from '@/component/Login';
import PageNotFound from '@/component/PageNotFound';
import EntityCreate from '@/component/entity/EntityCreate';
import EntitySearch from '@/component/entity/EntitySearch';
import ExternalLink from '@/component/ExternalLink';

export default {
  middleware: 'auth',
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
          path: 'entity/search/:id',
          name: 'EntitySearch',
          meta: { title: '查询' },
          component: EntitySearch,
        },
        {
          path: 'entity/create/:id',
          name: 'EntityCreate',
          meta: { title: '新增' },
          component: EntityCreate,
        },
        {
          path: 'external-link/:link',
          name: 'ExternalLink',
          meta: { title: '外部链接' },
          component: ExternalLink,
        },
      ],
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
};
