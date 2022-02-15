<template>
  <g class="brush-area" :transform="`translate(${margin.left}, ${margin.top})`">
    <rect x="0" y="0" :width="innerWidth" :height="innerHeight" />
    <text
      :transform="`translate(${innerWidth / 2}, ${
        innerHeight / 2
      }) rotate(90 0 0)`"
      >Drag to zoom</text
    >
    <g ref="brush"></g>
    <g :transform="`translate(${innerWidth}, 0)`">
      <D3Axis :scale="scale" position="right"></D3Axis>
    </g>
  </g>
</template>
<script>
import { select, brushX, brushY, scaleLinear } from "d3";
import D3Axis from "@/components/ccr/charts/D3Axis.vue";
//import { dataExtent } from "@/composables/boxplot.js";
import { getInnerChartSizes } from "@/composables/chart.js";

import { ref, onMounted, computed } from "vue";

export default {
  name: "ChartContext",
  components: { D3Axis },
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    margin: {
      type: Object,
      default: () => ({
        top: 20,
        right: 0,
        bottom: 30,
        left: 0,
      }),
    },
    domain: {
      type: Array,
    },
    brushDirection: {
      type: String,
      default: "vertical",
    },
  },
  setup(props, { emit }) {
    const { innerWidth, innerHeight } = getInnerChartSizes(
      props.width,
      props.height,
      props.margin
    );

    /*     const yDomain = computed(() => {
      return dataExtent(props.data);
    }); */
    const scale = computed(() => {
      return scaleLinear().domain(props.domain).range([innerHeight, 0]);
    });

    const updateBrushedDomain = ({ selection }) => {
      const extent = selection
        ? selection.map(scale.value.invert).reverse()
        : props.domain.value;
      emit("brush", extent);
    };

    const brush = ref(null);

    const brushFunction = props.brushDirection === "vertical" ? brushY : brushX;

    onMounted(() => {
      select(brush.value).call(
        brushFunction()
          .extent([
            [0, 0],
            [innerWidth, innerHeight],
          ])
          .on("brush end", updateBrushedDomain)
      );
    });

    return {
      innerWidth,
      innerHeight,
      scale,
      brush,
    };
  },
};
</script>

<style scoped>
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
