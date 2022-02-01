<template>
  <div class="icon-wrapper" v-html="svg"></div>
</template>

<script>
import feather from "feather-icons";
export default {
  props: {
    name: { type: String, required: true },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  computed: {
    svg() {
      return feather.icons[this.name].toSvg({
        class: "icon",
        width: this.width,
        height: this.height,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 900;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
