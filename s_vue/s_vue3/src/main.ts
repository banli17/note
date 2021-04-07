import { createApp } from 'vue';
import vant from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vant/lib/index.css';

createApp(App)
  .use(vant)
  .use(store)
  .use(router)
  .mount('#app');
