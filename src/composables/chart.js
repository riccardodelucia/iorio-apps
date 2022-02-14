import { ref } from "vue";

export const expand = function (extent) {
  const diff = Math.abs(extent[0] - extent[1]);
  return [extent[0] - 0.05 * diff, extent[1] + 0.05 * diff];
};

export const getTooltip = function () {
  const tooltipShow = ref(false);
  const tooltipCoords = ref([0, 0]);
  const tooltipData = ref({});

  const setupTooltip = ({ x, y }, data) => {
    tooltipCoords.value[0] = x;
    tooltipCoords.value[1] = y;
    tooltipData.value = data;
  };

  const onMouseOver = ({ event, data }) => {
    tooltipShow.value = true;
    const { clientX: x, clientY: y } = event;
    setupTooltip({ x, y }, data);
  };
  const onMouseMove = ({ event, data }) => {
    const { clientX: x, clientY: y } = event;
    setupTooltip({ x, y }, data);
  };

  const onMouseLeave = () => {
    tooltipShow.value = false;
    tooltipData.value = {};
  };

  return {
    onMouseOver,
    onMouseMove,
    onMouseLeave,
    tooltipCoords,
    tooltipData,
    tooltipShow,
    setupTooltip,
  };
};

export const getInnerChartSizes = function (width, height, margin) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return { innerWidth, innerHeight };
};

export const setTooltipContent = function (data) {
  const msg = Object.entries(data).reduce((acc, [key, value]) => {
    return acc + `${key}: ${value} <br />`;
  }, "");
  return msg;
};
