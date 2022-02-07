<template>
  <circle
    class="genes_signatures__points"
    v-for="(point, idx) in points"
    :key="idx"
    :cx="xScale(point.x)"
    :cy="yScale(point.y)"
    :r="pointRadius"
  ></circle>
</template>

<script>
export default {
  name: "MarksCurve",
  props: {
    points: {
      type: Array,
      required: true,
    },
    pointRadius: {
      type: Number,
      default: 4,
    },
    xScale: {
      type: Function,
    },
    yScale: {
      type: Function,
    },
  },
};
</script>

<style lang="scss">
.genes_signatures {
  &__points {
    fill: black;
  }
}
</style>
