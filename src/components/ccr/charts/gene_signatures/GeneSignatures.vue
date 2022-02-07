<template>
  <svg
    ref="svg"
    :width="width"
    :height="height"
    :viewBox="[0, 0, width, height].join(' ')"
  >
    <g ref="chart" :transform="`translate(${margin.left}, ${margin.top})`">
      <D3Axis :scale="yScale" position="left" />
      <g :transform="`translate(0, ${innerHeight})`">
        <D3Axis :scale="xScale" position="bottom" />
      </g>
    </g>
  </svg>
</template>

<script>
import { extent, scaleLinear } from "d3";
import { getInnerChartSizes } from "@/composables/chart.js";
import D3Axis from "@/components/ccr/charts/D3Axis.vue";

const setupChart = (data) => {
  const chartData = data.curve
    .map((item) => ({
      x: item.logFC,
      y: item.rank,
    }))
    .sort((a, b) => a.x - b.x);

  const xDomain = extent(chartData.map((item) => item.x));
  const yDomain = extent(chartData.map((item) => item.y));

  return { chartData, xDomain, yDomain };
};
export default {
  name: "GeneSignatures",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: { D3Axis },
  setup(props) {
    const width = 500;
    const height = 500;

    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 60,
    };

    const { innerWidth, innerHeight } = getInnerChartSizes(
      width,
      height,
      margin
    );

    const { chartData, xDomain, yDomain } = setupChart(props.data);
    const xScale = scaleLinear()
      .domain(xDomain)
      .range([0, innerWidth * 0.5]);
    const yScale = scaleLinear().domain(yDomain).range([0, innerHeight]);
    console.log(yDomain);

    return {
      width,
      height,
      margin,
      chartData,
      xScale,
      yScale,
      innerWidth,
      innerHeight,
    };
  },
};
</script>

<style></style>
