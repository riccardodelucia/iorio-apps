<template>
  <g>
    <g data-tippy-content="we" @mouseover="onMouseOver" class="boxplot">
      <line
        :x1="bandwidth / 2"
        :x2="bandwidth / 2"
        :y1="yScale(data.dist.W1)"
        :y2="yScale(data.dist.W2)"
        class="boxplot__range"
      />
      <line
        :x1="0"
        :x2="bandwidth"
        :y1="yScale(data.dist.W1)"
        :y2="yScale(data.dist.W1)"
        class="boxplot__whisker-q"
      />
      <line
        :x1="0"
        :x2="bandwidth"
        :y1="yScale(data.dist.W2)"
        :y2="yScale(data.dist.W2)"
        class="boxplot__whisker-q"
      />
      <line
        :x1="0"
        :x2="bandwidth"
        :y1="yScale(data.dist.sd1)"
        :y2="yScale(data.dist.sd1)"
        class="boxplot__whisker-stdev"
      />
      <line
        :x1="0"
        :x2="bandwidth"
        :y1="yScale(data.dist.sd2)"
        :y2="yScale(data.dist.sd2)"
        class="boxplot__whisker-stdev"
      />
      <rect
        :x="0"
        :y="yScale(data.dist.Q3)"
        :width="bandwidth"
        :height="boxHeight"
        class="boxplot__box"
      />
      <line
        :x1="0"
        :x2="bandwidth"
        :y1="yScale(data.dist.median)"
        :y2="yScale(data.dist.median)"
        class="boxplot__median"
      />
      <line
        :x1="0"
        :x2="bandwidth"
        :y1="yScale(data.dist.mean)"
        :y2="yScale(data.dist.mean)"
        class="boxplot__mean"
      />
      <line
        :x1="0"
        :x2="bandwidth"
        :y1="yScale(data.dist.median)"
        :y2="yScale(data.dist.median)"
        class="boxplot__median"
      />
    </g>

    <circle
      v-for="outlier in data.outliers"
      :key="outlier.location"
      r="4"
      :cx="bandwidth / 2 + outlier.xOffset"
      :cy="yScale(outlier.value)"
      class="boxplot__outliers"
      :data-tippy-content="setTooltipContent(outlier)"
      @mouseover="onMouseOver"
    />
  </g>
</template>

<script>
import tippy from "tippy.js";
import { setTooltipContent } from "@/composables/chart.js";
import { computed } from "vue";

export default {
  name: "Marks",
  props: {
    xScale: {
      type: Function,
    },
    yScale: {
      type: Function,
    },
    data: {
      type: Object,
    },
  },
  setup(props) {
    const bandwidth = computed(() => {
      return props.xScale.bandwidth();
    });
    const boxHeight = computed(() => {
      return (
        props.yScale(props.data.dist.Q1) - props.yScale(props.data.dist.Q3)
      );
    });

    const onMouseOver = (event) => {
      console.log(event);
      //Note: creating one tippy for each new element does cause a memory leak in the long run?
      tippy(event.target, { duration: 0 });
    };
    return { setTooltipContent, bandwidth, boxHeight, onMouseOver };
  },
};
</script>

<style scoped>
.boxplot__range {
  stroke: #5c5c5c;
  stroke-width: 1;
  stroke-dasharray: 4;
}
.boxplot__whisker-q {
  stroke: #5c5c5c;
  stroke-width: 2;
}
.boxplot__whisker-stdev {
  stroke: blue;
  stroke-width: 2;
}
.boxplot__box {
  fill: white;
  stroke: black;
}
.boxplot__median {
  stroke: red;
  stroke-width: 2;
}
.boxplot__mean {
  stroke: black;
  stroke-width: 2;
}
.boxplot__outliers {
  fill: white;
  stroke: black;
}
.boxplot__outliers:hover {
  fill: black;
  stroke: black;
}
</style>
