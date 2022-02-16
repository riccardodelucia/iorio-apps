<template>
  <g class="marks">
    <circle
      :class="{
        selected: gene.gene === modelValue,
      }"
      v-for="(gene, idx) in data.genes"
      :key="idx"
      :cx="xScale(gene.x)"
      :cy="yScale(gene.y)"
      :r="pointRadius"
      stroke="black"
      :data-tippy-content="gene.gene"
      @mouseover="onMouseOver($event, gene)"
      @mouseleave="onMouseLeave(gene)"
    ></circle
  ></g>
</template>

<script>
import { setupMarksChart } from "@/composables/genes-signatures-chart.js";

export default {
  name: "MarksCurve",
  props: {
    data: {
      type: Object,
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
    width: {
      type: Number,
    },
    modelValue: { type: String },
  },
  setup(props, context) {
    const { onMouseOver, onMouseLeave } = setupMarksChart(context);
    return { onMouseOver, onMouseLeave };
  },
};
</script>

<style lang="scss" scoped>
.marks {
  circle {
    fill: black;

    &.selected {
      fill: red;
      stroke: red;
      stroke-width: 8;
    }
  }
}
</style>
