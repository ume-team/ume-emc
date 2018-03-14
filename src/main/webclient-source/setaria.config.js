import message from '@/config/message.json';
import router from '@/config/router';

export default {
  env: {
    SERVICE_URL: '/ume-ems/rest/s01/',
    APP_TITLE: 'UME System',
    SERVICE_TIME_OUT: 60000,
    STORAGE_KEY: '__UME_STORAGE_',
    LOADING_TEXT: '加载中',
    TABLE_PAGE_SIZE: 10,
  },
  message,
  router,
};
