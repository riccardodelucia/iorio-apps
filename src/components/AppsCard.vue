<template>
  <div class="apps-card">
    <img
      class="apps-card__logo"
      :src="require('@/assets/logos/' + cardData.logo)"
      alt=""
    />
    <h3 class="apps-card__title">{{ cardData.title }}</h3>
    <p class="apps-card__description">{{ cardData.text }}</p>
    <button
      @click="$router.push(cardData.app)"
      v-if="cardData.app"
      type="button"
      class="button button--primary button--small apps-card__btn"
    >
      Web App <BaseIcon name="arrow-right" />
    </button>

    <a
      v-for="link in cardData.links"
      :key="link.url"
      :href="link.url"
      class="apps-card__link"
      target="_blank"
      ><img :src="require('@/assets/logos/' + link.logo + '')" alt=""
    /></a>
  </div>
</template>

<script>
export default {
  name: "AppsCard",
  props: {
    cardData: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
.apps-card {
  width: 30rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: min-content min-content 1fr 1fr min-content;
  grid-row-gap: 0.9em;
  grid-column-gap: 0.5em;

  padding: 1em 1.8em;
  overflow: hidden;

  box-shadow: var(--shadow-2);

  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &__logo {
    height: 8rem;
    display: block;
    grid-column: 1 / 6;
    grid-row: 1 / 2;
  }

  &__title {
    grid-row: 2 / 3;
    grid-column: 1 / -1;

    font-size: 1.9rem;
  }

  &__description {
    grid-row: 3 / 4;
    grid-column: 1 / -1;
    font-size: 1.4rem;
    line-height: 1;
  }

  &__btn {
    grid-row: 4 / 5;
    grid-column: 1 / -1;
  }

  &__link {
    grid-row: 5 / 6;
    text-decoration: none;
    cursor: pointer;
    &:visited,
    &:link,
    &:hover,
    &:active {
      color: inherit;
    }

    img {
      height: 2rem;
      display: block;
    }
  }
}
</style>
