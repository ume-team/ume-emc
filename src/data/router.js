import Login from '@/common/components/Login';
import Main from '@/common/components/Main';
import EntitySearch from '@/components/EntitySearch';
import EntityCreate from '@/components/EntityCreate';

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
