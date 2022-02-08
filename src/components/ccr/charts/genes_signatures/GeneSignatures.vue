<template>
  <Tooltip
    v-show="tooltipShow"
    :tooltipCoords="tooltipCoords"
    :data="tooltipData"
  ></Tooltip>
  <svg
    ref="svg"
    :width="width"
    :height="height"
    :viewBox="[0, 0, width, height].join(' ')"
  >
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
          :transform="`translate(${
            (innerWidth * 0.5) / 2
          }, ${xAxisLabelOffset})`"
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
        :y1="yScale(threshold)"
        :x2="innerWidth"
        :y2="yScale(threshold)"
      />
      <MarksCurve
        :points="chartData"
        :xScale="xScale"
        :yScale="yScale"
        @tooltipMouseover="onMouseOver"
        @tooltipMousemove="onMouseMove"
        @tooltipMouseleave="onMouseLeave"
      ></MarksCurve>
    </g>
  </svg>
</template>

<script>
import { extent, scaleLinear, scaleLog } from "d3";
import { getInnerChartSizes } from "@/composables/chart.js";
import D3Axis from "@/components/ccr/charts/D3Axis.vue";
import MarksCurve from "@/components/ccr/charts/genes_signatures/MarksCurve.vue";
import Tooltip from "@/components/ccr/charts/Tooltip.vue";
import { getTooltip } from "@/composables/chart.js";

const setupChart = (data) => {
  const chartData = data.curve
    .map((item) => ({
      x: item.logFC,
      y: item.rank,
    }))
    .sort((a, b) => a.x - b.x);

  const xDomain = extent(chartData.map((item) => item.x));
  const yDomain = extent(chartData.map((item) => item.y));
  const xInterval = xDomain[0] - xDomain[1];
  const xThreshold = data?.metrics[0]?.threshod * xInterval; // typo from the files
  const { idx: thresholdCandidateIdx } = chartData
    .map((item, idx) => ({
      dist: Math.abs(item.x - xThreshold),
      idx,
    }))
    .sort((a, b) => a.dist - b.dist)[0];
  const threshold = chartData[thresholdCandidateIdx].y;

  return { chartData, xDomain, yDomain, threshold };
};
export default {
  name: "GeneSignatures",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: { D3Axis, MarksCurve, Tooltip },
  setup(props) {
    const width = 500;
    const height = 500;

    const margin = {
      top: 20,
      right: 20,
      bottom: 40,
      left: 60,
    };

    const { innerWidth, innerHeight } = getInnerChartSizes(
      width,
      height,
      margin
    );

    const {
      onMouseOver,
      onMouseMove,
      onMouseLeave,
      tooltipCoords,
      tooltipData,
      tooltipShow,
    } = getTooltip();

    const { chartData, xDomain, yDomain, threshold } = setupChart(props.data);
    const xScale = scaleLinear()
      .domain(xDomain)
      .range([0, innerWidth * 0.5]);
    const yScale = scaleLog().domain(yDomain).range([0, innerHeight]);

    return {
      width,
      height,
      margin,
      chartData,
      xScale,
      xAxisLabelOffset: 30,
      yScale,
      yAxisLabelOffset: 35,
      threshold,
      innerWidth,
      innerHeight,
      onMouseOver,
      onMouseMove,
      onMouseLeave,
      tooltipCoords,
      tooltipData,
      tooltipShow,
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
