import Vue from 'vue';
import Http from 'vue-resource';

import CommonInterceptor from '@/resource/interceptors/common.interceptor';
import UMERequestInterceptor from '@/resource/interceptors/ume.request.interceptor';
import UMEResponseInterceptor from '@/resource/interceptors/ume.response.interceptor';

// 加载Service模块(vue-resource)
Vue.use(Http);

Vue.http.interceptors.push(UMERequestInterceptor);
Vue.http.interceptors.push(CommonInterceptor);
Vue.http.interceptors.push(UMEResponseInterceptor);
