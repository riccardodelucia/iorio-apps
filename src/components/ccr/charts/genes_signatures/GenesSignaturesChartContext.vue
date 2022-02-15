<template>
  <g class="brush-area" :transform="`translate(${margin.left}, ${margin.top})`">
    <BrushArea
      :width="innerWidth"
      :height="innerHeight"
      v-bind="$attrs"
      :domain="yDomain"
      :scale="yScale"
    >
      <rect x="0" y="0" :width="innerWidth" :height="innerHeight" />
    </BrushArea>

    <g :transform="`translate(${innerWidth}, 0)`">
      <D3Axis :scale="yScale" position="right"></D3Axis>
    </g>
  </g>
</template>

<script>
/* eslint-disable */
import BrushArea from "@/components/ccr/charts/BrushArea.vue";
import D3Axis from "@/components/ccr/charts/D3Axis.vue";
import { getInnerChartSizes } from "@/composables/chart.js";
import { computed } from "vue";
import { scaleLog } from "d3";

export default {
  name: "GenesSignaturesChartContext",
  components: { BrushArea, D3Axis },
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    yDomain: {
      type: Array,
    },
  },
  setup(props) {
    const margin = {
      top: 20,
      right: 0,
      bottom: 40,
      left: 0,
    };

    const { innerWidth, innerHeight } = getInnerChartSizes(
      props.width,
      props.height,
      margin
    );

    const yScale = computed(() => {
      return scaleLog().domain(props.yDomain).range([0, innerHeight]);
    });

    return { margin, innerWidth, innerHeight, yScale };
  },
};
</script>

<style lang="scss" scoped>
.brush-area rect {
  fill: #f5f5f5;
  stroke: #b1b1b1;
  stroke-width: 2px;
  stroke-dasharray: 4 2;
}
.brush-area text {
  text-anchor: middle;
  fill: #b1b1b1;
}
.brush-area__group text {
  fill: #b1b1b1;
}
</style>
