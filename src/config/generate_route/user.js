import UserCreate from '@/component/user/UserCreate';
import UserUpdate from '@/component/user/UserUpdate';
import UserSearch from '@/component/user/UserSearch';

const USER_ROUTE = [
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
    path: '/user/search/:USER_ID?',
    name: 'UserSearch',
    component: UserSearch,
  },
];

export default USER_ROUTE;
