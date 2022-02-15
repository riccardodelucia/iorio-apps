<template>
  <div class="controls-container">
    <BaseToggleSwitch
      v-if="data.raw && data.norm"
      v-model="showNormalizedData"
    />
    <span v-if="needsToggleSwitch">{{
      !showNormalizedData ? "unnormalized" : "normalized"
    }}</span>
  </div>
  <svg
    :width="width"
    :height="height"
    :viewBox="[0, 0, width, height].join(' ')"
  >
    <g>
      <BoxPlotChartFocus
        :data="selectedChartData"
        :width="chartFocusWidth"
        :height="height"
        :yDomain="yDomainFocus"
      />
    </g>
    <g :transform="`translate(${chartFocusWidth}, 0)`">
      <BoxPlotChartContext
        :data="selectedChartData"
        :width="chartContextWidth"
        :height="height"
        @brush="brushed"
        :domain="yDomainContext"
      >
        <template v-slot="{ innerWidth, innerHeight }">
          <rect x="0" y="0" :width="innerWidth" :height="innerHeight" />
          <text
            :transform="`translate(${innerWidth / 2}, ${
              innerHeight / 2
            }) rotate(90 0 0)`"
          >
            Drag to zoom
          </text>
        </template>
      </BoxPlotChartContext>
    </g>
  </svg>
</template>

<script>
//import { dataExtent } from "@/composables/boxplot.js";

import BoxPlotChartFocus from "@/components/ccr/charts/boxplot/BoxPlotChartFocus.vue";
//import BoxPlotChartContext from "@/components/ccr/charts/boxplot/BoxPlotChartContext.vue";
import BoxPlotChartContext from "@/components/ccr/charts/ChartContext.vue";

//import { expand } from "@/composables/chart.js";
import { extent } from "d3";

import { ref, computed, watchEffect } from "vue";

const setupChart = (data) => {
  const processData = (data) => {
    return data.map((item) => {
      return {
        label: [item.info[0].type, item.info[0].order.toString()].join(" "),
        order: item.info[0].order,
        dist: { ...item.dist[0], iqr: item.dist[0].Q3 - item.dist[0].Q1 },
        outliers: item.outliers
          .map((item) => {
            const parts = item.sgRNA.split("_");
            return {
              gene: item.gene,
              CCDS: parts[1],
              exon: parts[2],
              location: parts[3],
              sgRNA: parts[4],
              value: item.value,
              xOffset: (Math.random() - 0.5) * 40,
            };
          })
          .sort((a, b) => b.value - a.value),
      };
    });
  };
  const chartDataUnnormalized = data?.raw && processData(data.raw);
  const chartDataNormalized = data?.norm && processData(data.norm);

  return {
    chartDataUnnormalized,
    chartDataNormalized,
  };
};

const dataExtent = (data) => {
  const dist = data.map((item) => Object.values(item.dist)).flat();
  const outliers = data
    .map((item) => item.outliers)
    .flat()
    .map((item) => item.value)
    .concat();
  return extent(outliers.concat(dist)).sort((a, b) => b - a);
};

export default {
  name: "BoxPlotMultichart",
  components: { BoxPlotChartFocus, BoxPlotChartContext },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { chartDataUnnormalized, chartDataNormalized } = setupChart(
      props.data
    );

    const showNormalizedData = ref(Boolean(props.data?.norm));

    const selectedChartData = computed(() =>
      !showNormalizedData.value ? chartDataUnnormalized : chartDataNormalized
    );

    const yDomainFocus = ref(null);
    const yDomainContext = ref(null);

    const yDomainMaxUnnormalized =
      chartDataUnnormalized && dataExtent(chartDataUnnormalized); //expand(dataExtent(chartDataUnnormalized));
    const yDomainMaxNormalized =
      chartDataNormalized && dataExtent(chartDataNormalized); //expand(dataExtent(chartDataNormalized));

    watchEffect(() => {
      yDomainFocus.value = showNormalizedData.value
        ? yDomainMaxNormalized
        : yDomainMaxUnnormalized;
      yDomainContext.value = showNormalizedData.value
        ? yDomainMaxNormalized //.sort((a, b) => b - a)
        : yDomainMaxUnnormalized; //.sort((a, b) => b - a);
    });

    const brushed = (extent) => {
      yDomainFocus.value = extent;
    };

    const needsToggleSwitch = props.data?.norm && props.data?.raw;

    return {
      width: 1152,
      height: 500,
      chartFocusWidth: 900,
      chartContextWidth: 80,
      showNormalizedData,
      needsToggleSwitch,
      brushed,
      yDomainFocus,
      yDomainContext,
      selectedChartData,
    };
  },
};
</script>

<style lang="scss" scoped>
.controls-container {
  display: flex;
  align-items: center;

  * {
    margin-right: 0.4em;
  }
}
</style>

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
