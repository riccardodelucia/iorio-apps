<template>
  <nav class="pagination">
    <span>
      From {{ pagination.from }} to {{ pagination.to }} out of
      {{ paginationInfo.filteredItemsArrayLength }}
      <span
        v-if="
          paginationInfo.filteredItemsArrayLength <
          paginationInfo.totalItemsArrayLength
        "
        >[total: {{ paginationInfo.totalItemsArrayLength }}]</span
      >
    </span>
    <a
      class="pagination__link"
      v-if="pagination.prevPage"
      @click="$emit('paginate', currentPage - 1)"
    >
      Prev
    </a>
    <a v-else :disabled="true" class="pagination__link--disabled"> Prev </a>

    <a
      class="pagination__link"
      v-if="pagination.nextPage"
      @click="$emit('paginate', currentPage + 1)"
    >
      Next
    </a>
    <a v-else :disabled="true" class="pagination__link--disabled"> Next </a>
  </nav>
</template>

<script>
export default {
  props: ["paginationInfo", "currentPage"],
  data() {
    return {};
  },
  computed: {
    pagination() {
      const paginationData = {
        from: "",
        to: "",
        prevPage: "",
        nextPage: "",
      };
      paginationData.from = this.paginationInfo.filteredItemsArrayLength
        ? (this.currentPage - 1) * this.paginationInfo.itemsPerPage + 1
        : 0;
      paginationData.to =
        this.currentPage * this.paginationInfo.itemsPerPage >
        this.paginationInfo.filteredItemsArrayLength
          ? this.paginationInfo.filteredItemsArrayLength
          : this.currentPage * this.paginationInfo.itemsPerPage;

      paginationData.prevPage =
        this.currentPage > 1 ? this.currentPage - 1 : "";
      paginationData.nextPage =
        this.paginationInfo.filteredItemsArrayLength > paginationData.to
          ? this.currentPage + 1
          : "";
      return paginationData;
    },
  },
};
</script>

<style lang="scss">
.pagination {
  margin-top: 1em;
  display: flex;
  justify-content: flex-end;

  & > :not(:last-child) {
    margin-right: 0.6em;
  }

  &__link {
    &:link,
    &:visited {
      text-decoration: none;
    }
    cursor: pointer;
    background-color: var(--color-green-light);
    padding: 0.1em 0.2em;
    color: white;

    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }

    &:hover {
      color: var(--color-text-dark-blue);
    }

    transition: all 0.2s;
    &--disabled {
      color: var(--color-grey-dark);
      cursor: not-allowed;
      opacity: 0.5;
      text-decoration: none;
    }
  }
}
</style>
