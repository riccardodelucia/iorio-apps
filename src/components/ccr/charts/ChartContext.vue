<template>
  <g class="brush-area" :transform="`translate(${margin.left}, ${margin.top})`">
    <slot :innerWidth="innerWidth" :innerHeight="innerHeight"></slot>
    <g ref="brush"></g>
    <g
      v-if="brushDirection === 'vertical'"
      :transform="`translate(${innerWidth}, 0)`"
    >
      <D3Axis :scale="scale" :position="axisPos"></D3Axis>
    </g>
    <g
      v-if="brushDirection === 'horizontal'"
      :transform="`translate(0, ${innerHeight})`"
    >
      <D3Axis :scale="scale" :position="axisPos"></D3Axis>
    </g>
  </g>
</template>
<script>
import { select, brushX, brushY, scaleLinear } from "d3";
import D3Axis from "@/components/ccr/charts/D3Axis.vue";
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
    // the domain must be sorted according to how it has to be mapped on the screen, following the standard SVG axes orientation
    // horizontal brush: [left, right]
    // vertical brush:  [top, bottom]
    domain: {
      type: Array,
    },
    brushDirection: {
      type: String,
      default: "vertical",
    },
    axisPos: {
      type: String,
      default: "right",
    },
  },
  setup(props, { emit }) {
    const { innerWidth, innerHeight } = getInnerChartSizes(
      props.width,
      props.height,
      props.margin
    );

    let scale = undefined;
    let brushFunction = undefined;
    const brush = ref(null);

    if (props.brushDirection === "vertical") {
      scale = computed(() => {
        return scaleLinear().domain(props.domain).range([0, innerHeight]);
      });
      brushFunction = brushY;
    } else {
      scale = computed(() => {
        return scaleLinear().domain(props.domain).range([0, innerWidth]);
      });
      brushFunction = brushX;
    }

    const updateBrushedDomain = ({ selection }) => {
      const extent = selection
        ? selection.map(scale.value.invert)
        : props.domain;

      emit("brush", extent);
    };

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
