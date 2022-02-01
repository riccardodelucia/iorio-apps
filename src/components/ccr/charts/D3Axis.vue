<template>
  <g ref="axis"></g>
</template>

<script>
import { select, axisBottom, axisLeft, axisRight, axisTop } from "d3";
import { ref, watchEffect } from "vue";

export default {
  name: "D3Axis",
  props: {
    scale: {
      type: Function,
      required: true,
    },
    tickSize: {
      type: Number,
      default: 5,
    },
    position: {
      type: String,
      default: "x",
    },
  },
  setup(props) {
    const axis = ref(null);
    let axisFunction = null;
    switch (props.position) {
      case "left":
        axisFunction = (scale) => axisLeft(scale).tickSize(props.tickSize);
        break;
      case "right":
        axisFunction = (scale) => axisRight(scale).tickSize(props.tickSize);
        break;
      case "top":
        axisFunction = (scale) => axisTop(scale).tickSize(props.tickSize);
        break;
      case "bottom":
        axisFunction = (scale) => axisBottom(scale).tickSize(props.tickSize);
        break;
      default:
        axisFunction = (scale) => axisBottom(scale).tickSize(props.tickSize);
        break;
    }

    watchEffect(
      () => {
        select(axis.value)
          .call(axisFunction(props.scale))
          .attr("stroke-opacity", 0.2);
      },
      {
        flush: "post",
      }
    );

    return {
      axisFunction,
      axis,
    };
  },
};
</script>
