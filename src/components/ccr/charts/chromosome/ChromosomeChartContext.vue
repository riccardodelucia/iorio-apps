<template>
  <g :transform="`translate(${margin.left}, ${margin.top})`">
    <g :transform="`translate(0, ${innerHeight})`">
      <D3Axis :scale="xScale" orientation="x" />
    </g>
    <Marks
      :points="data.sgRNAArray"
      :segments="data.segments"
      :xScale="xScale"
      :yScale="yScale"
      :pointRadius="2"
    />
    <g ref="brush"></g>
  </g>
</template>

<script>
import { scaleLinear, extent, select, brushX } from "d3";
import Marks from "@/components/ccr/charts/chromosome/Marks.vue";
import D3Axis from "@/components/ccr/charts/D3Axis.vue";

import { getInnerChartSizes } from "@/composables/chart.js";

import { ref, onMounted } from "vue";

export default {
  name: "ChromosomeChartContext",
  components: { Marks, D3Axis },
  props: {
    data: {
      type: Object,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const margin = {
      top: 20,
      right: 50,
      bottom: 20,
      left: 50,
    };

    const { innerWidth, innerHeight } = getInnerChartSizes(
      props.width,
      props.height,
      margin
    );

    const yScale = scaleLinear()
      .domain(extent(props.data.sgRNAArray.map((d) => d.avgLogFC)))
      .range([innerHeight, 0]);

    const xScale = scaleLinear()
      .domain([0, props.data.sgRNAArray.length])
      .range([0, innerWidth]);

    const xDomain = xScale.domain();

    const updateScale = ({ selection }) => {
      const extent = selection ? selection.map(xScale.invert) : xDomain;
      emit("brush", extent);
    };

    const brush = ref(null);

    onMounted(() => {
      select(brush.value).call(
        brushX()
          .extent([
            [0, 0],
            [innerWidth, innerHeight],
          ])
          .on("brush end", updateScale)
      );
    });

    return {
      innerWidth,
      innerHeight,
      margin,
      xScale,
      yScale,
      brush,
    };
  },
};
</script>
