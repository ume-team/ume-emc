import Vue from 'vue';
import Http from 'vue-resource';

import CommonInterceptor from '@/common/resource/interceptors/common.interceptor';
import UMERequestInterceptor from '@/common/resource/interceptors/ume.request.interceptor';
import UMEResponseInterceptor from '@/common/resource/interceptors/ume.response.interceptor';

// 加载Service模块(vue-resource)
Vue.use(Http);

Vue.http.interceptors.push(UMERequestInterceptor);
Vue.http.interceptors.push(CommonInterceptor);
Vue.http.interceptors.push(UMEResponseInterceptor);
