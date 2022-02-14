<template>
  <svg
    ref="svg"
    :width="width"
    :height="height"
    :viewBox="[0, 0, width, height].join(' ')"
  >
    <GenesSignaturesFocus
      :data="chartData"
      :width="width"
      :height="height"
    ></GenesSignaturesFocus>
  </svg>
</template>

<script>
import { extent } from "d3";

import GenesSignaturesFocus from "@/components/ccr/charts/genes_signatures/GenesSignaturesFocus.vue";

const setupChart = (data) => {
  const genes = data.curve
    .map((item) => ({
      x: item.logFC,
      y: item.rank,
      gene: item.gene,
    }))
    .sort((a, b) => a.x - b.x);

  const xDomain = extent(genes.map((item) => item.x));
  const xInterval = xDomain[0] - xDomain[1];
  const xThreshold = data.metrics[0].threshod * xInterval; // typo from the files
  const { idx: thresholdCandidateIdx } = genes
    .map((item, idx) => ({
      dist: Math.abs(item.x - xThreshold),
      idx,
    }))
    .sort((a, b) => a.dist - b.dist)[0];

  const threshold = genes[thresholdCandidateIdx].y;

  return {
    genes,
    threshold,
    genesSets: data.geneSetArray,
  };
};
export default {
  name: "GeneSignatures",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: { GenesSignaturesFocus },
  setup(props) {
    const width = 700;
    const height = 900;

    const chartData = setupChart(props.data);

    return {
      width,
      height,
      chartData,
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
