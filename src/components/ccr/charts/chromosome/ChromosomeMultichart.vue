<template>
  <!-- Tooltip must be here on the multichart, since child components all render within the svg.
    We cannot add a div inside an SVG document! -->

  <div class="controls-container">
    <BaseCheckbox v-model="selections.segments" label="segments" />
    <BaseCheckbox v-model="selections.guides" label="guides" />

    <span>{{
      showNormalizedData ? "post correction" : "pre  correction"
    }}</span>
    <BaseToggleSwitch v-model="showNormalizedData" />
  </div>
  <svg
    :width="width"
    :height="height"
    :viewBox="[0, 0, width, height].join(' ')"
  >
    <g>
      <ChromosomeChartFocus
        :data="selectedChartData"
        :width="width"
        :height="chartFocusHeight"
        :xBrush="xBrush"
        :selections="selections"
      />
    </g>
    <g :transform="`translate(0, ${chartFocusHeight})`">
      <ChromosomeChartContext
        :data="selectedChartData"
        :width="width"
        :height="chartContextHeight"
        @brush="brushed"
      />
    </g>
  </svg>
</template>

<script>
import ChromosomeChartFocus from "@/components/ccr/charts/chromosome/ChromosomeChartFocus.vue";
import ChromosomeChartContext from "@/components/ccr/charts/chromosome/ChromosomeChartContext.vue";

import { extent } from "d3";

import { ref, reactive, computed } from "vue";

const setupChart = (data) => {
  const chartDataUnnormalized = {
    segments: data.segments,
    sgRNAArray: data.sgRNAArray.map((sgrna) => {
      const newSgrna = {
        ...sgrna,
        avgLogFC: sgrna.avgLogFC,
      };
      return newSgrna;
    }),
  };

  const chartDataNormalized = {
    segments: data.segmentsAdj,
    sgRNAArray: data.sgRNAArray.map((sgrna) => {
      const newSgrna = {
        ...sgrna,
        avgLogFC: sgrna.avgLogFCAdj ? sgrna.avgLogFCAdj : sgrna.avgLogFC,
      };
      return newSgrna;
    }),
  };
  return { chartDataUnnormalized, chartDataNormalized };
};

export default {
  name: "ChromosomeMultichart",
  components: { ChromosomeChartFocus, ChromosomeChartContext },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const showNormalizedData = ref(true);

    const { chartDataUnnormalized, chartDataNormalized } = setupChart(
      props.data
    );

    const xBrush = ref(extent([0, props.data.sgRNAArray.length]));

    const brushed = (extent) => {
      xBrush.value = extent;
    };

    const selectedChartData = computed(() =>
      showNormalizedData.value ? chartDataNormalized : chartDataUnnormalized
    );

    return {
      height: 500,
      width: 1152,
      chartFocusHeight: 350,
      chartContextHeight: 100,
      selectedChartData,
      xBrush,
      selections: reactive({ segments: true, guides: true }),
      showNormalizedData,
      brushed,
    };
  },
};
</script>

<style lang="scss" scoped>
.controls-container {
  margin: 0 2em;
  margin-bottom: 1em;
  display: grid;
  grid-template-columns: repeat(2, max-content) 1fr repeat(2, max-content);
  grid-gap: 2em;
  align-items: center;

  span {
    grid-column: 4 / 5;
  }
}
</style>
