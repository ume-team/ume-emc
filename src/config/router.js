import EntitySearch from '@/component/entity/EntitySearch';
import EntityCreate from '@/component/entity/EntityCreate';
import UserCreate from '@/component/user/UserCreate';
import UserUpdate from '@/component/user/UserUpdate';
import UserSearch from '@/component/user/UserSearch';
import Login from '@/component/Login';
import Dashboard from '@/component/Dashboard';
import PageNotFound from '@/component/PageNotFound';

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
        {
          path: '/user/create',
          name: 'UserCreate',
          component: UserCreate,
        },
        {
          path: '/user/update/:USER_ID',
          name: 'UserUpdate',
          component: UserUpdate,
        },
        {
          path: '/user/search',
          name: 'UserSearch',
          component: UserSearch,
        },
      ],
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
};
