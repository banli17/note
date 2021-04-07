import { IGlobalState } from '@/typings/home';
import { createStore } from 'vuex';
import home from './modules/home';

export default createStore<IGlobalState>({
  mutations: {
  },
  actions: {
  },
  modules: {
    home,
  },
});
