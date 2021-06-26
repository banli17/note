<template>
  <component :is="tagName" v-bind="tagProps" @click="handleClickLink">
    <slot></slot>
  </component>
</template>

<script>
import { oneOf } from "../../utils/assist";
import mixinsLink from "../../mixins/link";
import mixinsForm from "../../mixins/form";

export default {
  mixins: [mixinsLink, mixinsForm],
  props: {
    htmlType: {
      default: "button",
      validator(value) {
        return oneOf(value, ["button", "submit", "reset"]);
      },
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
    tagProps() {
      const { to, isHrefPattern } = this;
      if (isHrefPattern) {
        const { linkUrl, target } = this;
        return {
          href: linkUrl,
          target,
        };
      } else {
        const { htmlType } = this;
        return { type: htmlType };
      }
    },
  },
  methods: {
    handleClickLink(event) {
      this.$emit("click", event);

      // 按住 ctrl 或 command 键时，在新窗口打开
      const openInNewWindow = event.ctrlKey || event.metaKey;

      this.handleCheckClick(event, openInNewWindow);
    },
  },
};
</script>
