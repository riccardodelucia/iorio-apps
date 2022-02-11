<template>
  <g>
    <g v-show="selections.guides">
      <circle
        class="chromosome__sgrna"
        v-for="point in points"
        :key="`point${point.idx}`"
        :cx="xScale(point.idx)"
        :cy="yScale(point.avgLogFC)"
        :r="pointRadius"
        :data-tippy-content="setTooltipContent(point)"
        @mouseover="onMouseOver"
      ></circle>
    </g>
    <g v-show="selections.segments">
      <line
        class="chromosome__segment"
        v-for="segment in segments"
        :key="`segment${segment.idxStart}`"
        :x1="xScale(segment.idxStart)"
        :x2="xScale(segment.idxEnd)"
        :y1="yScale(segment.avgLogFC)"
        :y2="yScale(segment.avgLogFC)"
        :data-tippy-content="setTooltipContent(segment)"
        @mouseover="onMouseOver"
      ></line>
    </g>
  </g>
</template>

<script>
import tippy from "tippy.js";

export default {
  name: "Marks",
  props: {
    points: {
      type: Array,
      required: true,
    },
    segments: {
      type: Array,
    },
    xScale: {
      type: Function,
    },
    yScale: {
      type: Function,
    },
    pointRadius: {
      type: Number,
      default: 4,
    },
    selections: {
      type: Object,
      default: () => ({ segments: true, guides: true }),
    },
  },
  methods: {
    onMouseOver(event) {
      //Note: creating one tippy for each new element does cause a memory leak in the long run?
      tippy(event.target, { duration: 0 });
      //this.$emit("tooltip-mouseover", { event, data: point });
    },
    setTooltipContent(data) {
      const msg = Object.entries(data).reduce((acc, [key, value]) => {
        return acc + `${key}: ${value}\n`;
      }, "");
      return msg;
    },
  },
};
</script>

<style lang="scss" scoped>
.chromosome {
  &__sgrna {
    fill: #1ca700;
    opacity: 0.7;

    &:hover {
      fill: red;
      opacity: 1;
    }
  }
  &__segment {
    stroke-width: 4;
    stroke: black;

    &:hover {
      stroke: red;
      stroke-width: 5;
    }
  }
}
</style>
