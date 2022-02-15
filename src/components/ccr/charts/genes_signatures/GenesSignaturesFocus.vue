<template>
  <g ref="chart" :transform="`translate(${margin.left}, ${margin.top})`">
    <text
      :transform="`translate(${-yAxisLabelOffset}, ${
        innerHeight / 2
      }) rotate(-90)`"
      class="axis-label"
    >
      Depletion Rank
    </text>
    <D3Axis :scale="yScale" position="left" />
    <g :transform="`translate(0, ${innerHeight})`">
      <D3Axis :scale="xScale" position="bottom" />
      <text
        :transform="`translate(${curveWidth / 2}, ${xAxisLabelOffset})`"
        class="axis-label"
      >
        Log FC
      </text>
    </g>
    <line
      class="chart__line chart__line--dashed chart__line--black"
      :x1="xScale(0)"
      :y1="0"
      :x2="xScale(0)"
      :y2="innerHeight"
    />
    <line
      class="chart__line chart__line--dashed chart__line--red"
      :x1="0"
      :y1="yScale(data.threshold)"
      :x2="innerWidth"
      :y2="yScale(data.threshold)"
    />
    <MarksCurve
      :points="data.genes"
      :xScale="xScale"
      :yScale="yScale"
      @selectedGene="onSelection"
    ></MarksCurve>
    <g :transform="`translate(${curveWidth + padding.x}, 0)`">
      <MarksGeneSet
        :geneSet="data.genesSets.CFE"
        :width="geneSetWidth"
        :yScale="yScale"
        :selectedGene="selectedGene"
        :thr="data.threshold"
      ></MarksGeneSet>
    </g>
  </g>
</template>

<script>
import { extent, scaleLinear, scaleLog } from "d3";
import { ref } from "vue";

import { getInnerChartSizes } from "@/composables/chart.js";
import D3Axis from "@/components/ccr/charts/D3Axis.vue";
import MarksCurve from "@/components/ccr/charts/genes_signatures/MarksCurve.vue";
import MarksGeneSet from "@/components/ccr/charts/genes_signatures/MarksGeneSet.vue";

export default {
  name: "GenesSignaturesFocus",
  props: {
    data: {
      type: Object,
      required: true,
    },
    width: { type: Number },
    height: { type: Number },
    yDomain: {
      type: Array,
    },
  },
  components: { D3Axis, MarksCurve, MarksGeneSet },
  setup(props) {
    const margin = {
      top: 20,
      right: 20,
      bottom: 40,
      left: 60,
    };

    const { innerWidth, innerHeight } = getInnerChartSizes(
      props.width,
      props.height,
      margin
    );

    const xDomain = extent(props.data.genes.map((item) => item.x));

    const curveWidth = innerWidth * 0.5;
    const padding = { x: 20, y: 30 };
    const geneSetWidth = innerWidth - curveWidth - padding.x;

    const xScale = scaleLinear()
      .domain(xDomain)
      .range([0, innerWidth * 0.5]);
    const yScale = scaleLog()
      .domain(props.yDomain)
      .range([0, innerHeight - padding.y]);

    const selectedGene = ref(null);

    const onSelection = (gene) => {
      selectedGene.value = gene;
    };

    return {
      margin,
      xScale,
      xAxisLabelOffset: 30,
      yScale,
      yAxisLabelOffset: 35,
      innerWidth,
      innerHeight,
      curveWidth,
      geneSetWidth,
      padding,
      selectedGene,
      onSelection,
    };
  },
};
</script>

<style lang="scss" scoped>
.chart__line {
  stroke-width: 1;
  &--dashed {
    stroke-dasharray: 4 2;
  }
  &--black {
    stroke: black;
  }
  &--red {
    stroke: red;
  }
}
.axis-label {
  text-anchor: middle;
  font-family: sans-serif;
  font-size: 15px;
  color: black;
}
</style>
