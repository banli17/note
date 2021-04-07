<template>
  <div>
    <HomeHeader
      :category="category"
      @setCurrentCategory='setCurrentCategory'></HomeHeader>
    <HomeList></HomeList>
    <HomeSwiper></HomeSwiper>
  </div>
</template>

<script lang='ts'>
import * as Types from '@/store/action-types';
import { CATEGORY_TYPES, IGlobalState } from '@/typings/home';
import { computed, defineComponent } from 'vue';
import { Store, useStore } from 'vuex';
import HomeHeader from './home-header.vue';
import HomeList from './home-list.vue';
import HomeSwiper from './home-swiper.vue';

function useCatgory(store: Store<IGlobalState>) {
  const category = computed(() => store.state.home.currentCategory);

  function setCurrentCategory(category: CATEGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
  }
  return {
    category,
    setCurrentCategory,
  };
}

export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  setup() {
    const store = useStore<IGlobalState>();
    console.log(store.state.home);

    const { category, setCurrentCategory } = useCatgory(store);
    console.log(store);

    return {
      category,
      setCurrentCategory,
    };
  },
});
</script>
