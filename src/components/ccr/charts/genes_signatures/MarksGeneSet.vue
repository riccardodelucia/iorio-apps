<template>
  <line
    v-for="(gene, idx) in geneSet"
    :key="idx"
    :x1="0"
    :x2="300"
    :y1="yScale(gene.rank)"
    :y2="yScale(gene.rank)"
    class="genes-signatures__gene"
    :class="{
      'genes-signatures__gene--selected': gene.gene === selectedGene,
      'genes-signatures__gene--grey': gene.rank >= thr,
    }"
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
  stroke: blue;
  stroke-width: 2;
  opacity: 0.2;

  &--selected {
    stroke: red;
    stroke-width: 4;
    opacity: 1;
  }

  &--grey {
    stroke: grey;
  }
}
</style>
