import Login from '@/common/component/Login';
import Main from '@/common/component/Main';
import EntitySearch from '@/component/EntitySearch';
import EntityCreate from '@/component/EntityCreate';

export default {
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Main',
      meta: { auth: true },
      component: Main,
      children: [
        {
          path: '/entity/search/:id',
          name: 'EntitySearch',
          meta: { auth: true },
          component: EntitySearch,
        },
        {
          path: '/entity/create/:id',
          name: 'EntityCreate',
          meta: { auth: true },
          component: EntityCreate,
        },
      ],
    },
  ],
};
