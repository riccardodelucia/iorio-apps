<template>
  <line
    v-for="(gene, idx) in geneSet"
    :key="idx"
    :x1="0"
    :x2="width"
    :y1="yScale(gene.rank)"
    :y2="yScale(gene.rank)"
    class="genes-signatures__gene"
    :class="[
      `genes-signatures__gene--${gene.rank <= thr ? 'blue' : 'grey'}`,
      gene.gene === selectedGene ? 'genes-signatures__gene--selected' : '',
    ]"
    :id="`${gene.gene}`"
  ></line>
  <use
    :xlink:href="`#${selectedGene}`"
    class="genes-signatures__gene--selected"
    stroke="red"
  />
</template>

<script>
export default {
  name: "MarksGenesSet",
  props: {
    geneSet: { type: Array },
    yScale: {
      type: Function,
    },
    width: {
      type: Number,
    },
    selectedGene: { type: String },
    thr: {
      type: Number,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.genes-signatures__gene {
  stroke-width: 2;
  opacity: 0.2;

  &--blue {
    stroke: blue;
  }
  &--grey {
    stroke: grey;
  }

  &--selected {
    stroke: red;
    stroke-width: 4;
    opacity: 1;
  }
}
</style>
