<template>
  <div class="search">
    <input
      class="search__input"
      placeholder="Search..."
      :value="value"
      @input="updateValue"
    />
    <BaseIcon name="search" class="search__icon"></BaseIcon>
  </div>
</template>

<script>
export default {
  name: "BaseSearchBar",
  props: {
    value: [String, Number],
  },
  methods: {
    updateValue(e) {
      this.$emit("search", e.target.value);
    },
  },
};
</script>

<style lang="scss">
.search {
  display: flex;
  justify-content: left;
  align-items: center;

  &__input {
    margin-right: -3.25rem;
    background-color: var(--color-grey-light);
    border: 1px solid var(--color-grey-medium);
    border-radius: 8px;
    padding: 0.2em 0.3em;

    &:focus {
      outline: none;
    }
  }

  &__icon {
    color: var(--color-grey-dark);
  }
}
</style>
