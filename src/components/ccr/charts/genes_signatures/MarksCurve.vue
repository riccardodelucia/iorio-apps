<template>
  <circle
    class="genes_signatures__points"
    v-for="(point, idx) in points"
    :key="idx"
    :cx="xScale(point.x)"
    :cy="yScale(point.y)"
    :r="pointRadius"
    @mouseover="$emit('tooltip-mouseover', { event: $event, data: point })"
    @mousemove="$emit('tooltip-mousemove', { event: $event, data: point })"
    @mouseleave="$emit('tooltip-mouseleave')"
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

    &:hover {
      fill: red;
    }
  }
}
</style>
