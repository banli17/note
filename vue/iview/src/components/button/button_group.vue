<template>
  <component :is="tagName">
    <slot></slot>
  </component>
</template>

<script>
import mixinsLink from "../../mixins/link";
import mixinsForm from "../../mixins/form";

export default {
  mixins: [mixinsLink, mixinsForm],
  props: {
    to: {
      type: String,
    },
  },
  computed: {
    isHrefPattern() {
      const { to } = this;
      console.log("to", to);
      return !!to;
    },
    tagName() {
      const { isHrefPattern } = this;
      return isHrefPattern ? "a" : "button";
    },
  },
};
</script>
