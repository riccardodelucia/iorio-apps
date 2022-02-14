<template>
  <g>
    <circle
      class="genes-signatures__points"
      v-for="(point, idx) in points"
      :key="idx"
      :cx="xScale(point.x)"
      :cy="yScale(point.y)"
      :r="pointRadius"
      stroke="black"
      :data-tippy-content="point.gene"
      @mouseover="onMouseOver($event, point)"
      @mouseleave="onMouseLeave(point)"
    ></circle
  ></g>
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
  setup(props, { emit }) {
    const { onMouseOver: updateTooltip, setTooltipContent } = setupTooltip();

    const onMouseOver = (event, point) => {
      updateTooltip(event);
      emit("selectedGene", point.gene);
    };

    const onMouseLeave = () => {
      emit("selectedGene", null);
    };
    return { onMouseOver, onMouseLeave, setTooltipContent };
  },
};
</script>

<style lang="scss" scoped>
.genes-signatures {
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
