<template>
  <div>
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
      @mouseover="onMouseOver"
      @mousemove="onMouseOver"
      @mouseleave="onMouseLeave"
    >
      <g ref="chart" :transform="`translate(${margin.left}, ${margin.top})`">
        <D3Axis :scale="yScale" position="left" />
        <text
          :transform="`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`"
          class="axis-label"
        >
          {{ yLabel }}
        </text>
        <g :transform="`translate(0, ${innerHeight})`">
          <D3Axis :scale="xScale" position="bottom" />
          <text
            :transform="`translate(${innerWidth / 2}, ${xAxisLabelOffset})`"
            class="axis-label"
          >
            {{ xLabel }}
          </text>
        </g>
        <slot
          :lineChartProps="{
            sizes: { innerHeight, innerWidth },
            scales: { xScale, yScale },
          }"
        ></slot>
        <path :d="curve" class="chart__path" />
        <circle
          v-show="tooltipShow"
          :cx="cursorPoint.x"
          :cy="cursorPoint.y"
          r="3"
          class="chart__point"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear, extent, line, bisector, pointer } from "d3";
import D3Axis from "@/components/ccr/charts/D3Axis.vue";

import { ref, reactive, onMounted } from "vue";
import { getTooltip } from "@/composables/chart.js";

import Tooltip from "@/components/ccr/charts/Tooltip.vue";

import { getInnerChartSizes } from "@/composables/chart.js";

const bisectD3 = bisector((d) => d.x).left;

const bisect = (event, xScale, data, chart) => {
  const chartXSVGCoord = pointer(event, chart.value)[0];

  const x = xScale.invert(chartXSVGCoord);
  const index = bisectD3(data, x);

  return index >= data.length ? data.at(-1) : data[index];
};

export default {
  name: "LineChart",
  props: {
    data: {
      type: Array,
      required: true,
    },
    xLabel: String,
    xDomain: { type: Array, required: true },
    yLabel: String,
    yDomain: { type: Array, required: true },
  },
  components: { D3Axis, Tooltip },
  setup(props) {
    const width = 500;
    const height = 500;

    const margin = {
      top: 20,
      right: 0,
      bottom: 40,
      left: 50,
    };

    const { innerWidth, innerHeight } = getInnerChartSizes(
      width,
      height,
      margin
    );

    const { tooltipShow, setupTooltip, tooltipCoords, tooltipData } =
      getTooltip();

    const xScale = scaleLinear().domain(props.xDomain).range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain(extent(props.yDomain))
      .range([innerHeight, 0]);

    const curve = line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))(props.data);

    let svgOrigin = ref(null);
    const svg = ref(null);
    const chart = ref(null);

    const cursorPoint = reactive({ x: 0, y: 0 });

    const onMouseOver = (event) => {
      tooltipShow.value = true;
      const datum = bisect(event, xScale, props.data, chart.value);
      cursorPoint.x = xScale(datum.x);
      cursorPoint.y = yScale(datum.y);
      const x = xScale(datum.x) + svgOrigin.value[0] + margin.left;
      const y = yScale(datum.y) + svgOrigin.value[1] + margin.top;
      setupTooltip({ x, y }, datum);
    };

    onMounted(() => {
      const { left, top } = svg.value.getBoundingClientRect();
      svgOrigin.value = [left, top];
    });

    return {
      width,
      height,
      margin,
      innerWidth,
      innerHeight,
      curve,
      xScale,
      xAxisLabelOffset: 30,
      yScale,
      yAxisLabelOffset: 30,
      cursorPoint,
      tooltipShow,
      tooltipCoords,
      tooltipData,
      svg,
      chart,
      onMouseOver,
    };
  },
};
</script>

<style lang="scss" scoped>
.chart {
  &__path {
    stroke: blue;
    stroke-width: 2px;
    fill: none;
  }
  &__point {
    stroke: orangered;
    fill: orangered;
  }
}

.axis-label {
  text-anchor: middle;
  font-family: sans-serif;
  font-size: 15px;
  color: black;
}
</style>
