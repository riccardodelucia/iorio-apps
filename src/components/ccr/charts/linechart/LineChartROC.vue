<template>
  <div>
    <LineChart
      :data="chartData"
      :xDomain="xDomain"
      :xLabel="xLabel"
      :yDomain="yDomain"
      :yLabel="yLabel"
    >
      <template v-slot:default="{ lineChartProps }">
        <g>
          <line
            class="chart__line chart__line--dashed"
            :x1="0"
            :y1="lineChartProps.scales.yScale(metrics.recall)"
            :x2="lineChartProps.sizes.innerWidth"
            :y2="lineChartProps.scales.yScale(metrics.recall)"
          />
          <line
            class="chart__line"
            :x1="0"
            :y1="lineChartProps.sizes.innerHeight"
            :x2="lineChartProps.sizes.innerWidth"
            :y2="0"
          />
        </g>
      </template>
    </LineChart>
    <div>
      <ul class="metrics__list">
        <li v-for="[key, value] in Object.entries(metrics)" :key="key">
          {{ `${key}: ${value}` }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LineChart from "@/components/ccr/charts/linechart/LineChart.vue";

export default {
  components: { LineChart },
  name: "LineChartROC",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    const chartData = this.data.curve
      .map((item) => ({
        x: item.specificity,
        y: item.sensitivity,
        threshold: item.threshold,
      }))
      .sort((a, b) => a.x - b.x);

    return {
      metrics: this.data.metrics[0],
      chartData,
      xLabel: "Specificity",
      yLabel: "Sensitivity",
      xDomain: [1.05, 0.05],
      yDomain: [-0.05, 1.05],
    };
  },
};
</script>

<style lang="scss" scoped>
.metrics__list {
  list-style: none;
}
.chart__line {
  stroke: rgb(218, 218, 218);
  stroke-width: 1px;
  &--dashed {
    stroke-dasharray: 4 2;
  }
}
</style>
