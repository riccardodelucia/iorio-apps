<template>
  <svg
    ref="svg"
    :width="width"
    :height="height"
    :viewBox="[0, 0, width, height].join(' ')"
  ></svg>
</template>

<script>
export default {
  name: "GeneSignatures",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const width = 500;
    const height = 500;

    return { width, height };
  },
};
</script>

<style></style>
