<template>
  <Tooltip
    v-show="tooltipShow"
    :tooltipCoords="tooltipCoords"
    :data="tooltipData"
  ></Tooltip>
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
        @tooltipMouseover="onMouseOver"
        @tooltipMousemove="onMouseMove"
        @tooltipMouseleave="onMouseLeave"
      />
    </g>
    <g :transform="`translate(${chartFocusWidth}, 0)`">
      <BoxPlotChartContext
        :data="selectedChartData"
        :width="chartContextWidth"
        :height="height"
        @brush="brushed"
      />
    </g>
  </svg>
</template>

<script>
import { dataExtent } from "@/composables/boxplot.js";

import Tooltip from "@/components/ccr/charts/Tooltip.vue";
import { getTooltip } from "@/composables/chart.js";

import BoxPlotChartFocus from "@/components/ccr/charts/boxplot/BoxPlotChartFocus.vue";
import BoxPlotChartContext from "@/components/ccr/charts/boxplot/BoxPlotChartContext.vue";

import { expand } from "@/composables/chart.js";

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

  const yDomainMaxUnnormalized =
    data?.raw && expand(dataExtent(chartDataUnnormalized));
  const yDomainMaxNormalized =
    data?.norm && expand(dataExtent(chartDataNormalized));

  return {
    chartDataUnnormalized,
    chartDataNormalized,
    yDomainMaxUnnormalized,
    yDomainMaxNormalized,
  };
};

export default {
  name: "BoxPlotMultichart",
  components: { BoxPlotChartFocus, BoxPlotChartContext, Tooltip },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const {
      onMouseOver,
      onMouseMove,
      onMouseLeave,
      tooltipCoords,
      tooltipData,
      tooltipShow,
    } = getTooltip();

    const {
      chartDataUnnormalized,
      chartDataNormalized,
      yDomainMaxUnnormalized,
      yDomainMaxNormalized,
    } = setupChart(props.data);

    const showNormalizedData = ref(Boolean(props.data?.norm));

    const selectedChartData = computed(() =>
      !showNormalizedData.value ? chartDataUnnormalized : chartDataNormalized
    );

    const yDomainFocus = ref(null);
    watchEffect(() => {
      yDomainFocus.value = showNormalizedData.value
        ? yDomainMaxNormalized
        : yDomainMaxUnnormalized;
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
      selectedChartData,
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
.controls-container {
  display: flex;
  align-items: center;

  * {
    margin-right: 0.4em;
  }
}
</style>
