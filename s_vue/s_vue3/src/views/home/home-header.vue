<template>
<div>
  <van-dropdown-menu>
    <van-dropdown-item :modelValue="category"
      @change="change"
      :options="options"/>
</van-dropdown-menu>
</div>
</template>

<script lang="ts">
import { CATEGORY_TYPES } from '@/typings/home';
import {
  defineComponent, PropType, reactive, toRefs,
} from 'vue';

export default defineComponent({
  props: {
    category: {
      type: Number as PropType<CATEGORY_TYPES>,
    },
  },
  emits: ['setCurrentCategory'], // 为了提示作用的
  setup(props, context) {
    console.log('props', props);

    // context.emit('setCurrentCategory');
    const state = reactive({
      options: [
        { text: '全部课程', value: CATEGORY_TYPES.ALL },
        { text: 'react课程', value: CATEGORY_TYPES.REACT },
        { text: 'vue课程', value: CATEGORY_TYPES.VUE },
        { text: 'node课程', value: CATEGORY_TYPES.NODE },
      ],
    });

    function change(value: CATEGORY_TYPES) {
      context.emit('setCurrentCategory', value);
    }

    return { ...toRefs(state), change };
  },
});
</script>
