<template>
  <circle
    class="genes_signatures__points"
    v-for="(point, idx) in points"
    :key="idx"
    :cx="xScale(point.x)"
    :cy="yScale(point.y)"
    :r="pointRadius"
    :data-tippy-content="point.gene"
    @mouseover="onMouseOver"
  ></circle>
</template>

<script>
import { setupTooltip } from "@/composables/chart.js";

export default {
  name: "MarksCurve",
  props: {
    points: {
      type: Array,
      required: true,
    },
    pointRadius: {
      type: Number,
      default: 4,
    },
    xScale: {
      type: Function,
    },
    yScale: {
      type: Function,
    },
  },
  setup() {
    const { onMouseOver, setTooltipContent } = setupTooltip();
    return { onMouseOver, setTooltipContent };
  },
};
</script>

<style lang="scss" scoped>
.genes_signatures {
  &__points {
    fill: black;

    &:hover {
      fill: red;
      stroke: red;
      stroke-width: 8;
    }
  }
}
</style>
