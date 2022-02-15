<template>
  <line
    v-for="(gene, idx) in geneSet"
    :key="idx"
    :x1="0"
    :x2="300"
    :y1="yScale(gene.rank)"
    :y2="yScale(gene.rank)"
    :data-tippy-content="gene.gene"
    class="genes-signatures__gene"
    :class="{ 'genes-signatures__gene--selected': gene.gene === selectedGene }"
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
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.genes-signatures__gene {
  stroke: black;
  stroke-width: 2;

  &--selected {
    stroke: red;
    stroke-width: 4;
  }
}
</style>
