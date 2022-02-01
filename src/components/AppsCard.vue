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
  /* flex-direction: column;
  justify-content: space-between; */

  //margin: 2em 1em;
  padding: 1em 1.8em;
  //background-color: white;
  overflow: hidden;
  //border: 1px solid #eaeaea;

  //border-radius: 8px;
  box-shadow: var(--shadow-1);

  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  /*   &__header {
    display: flex;
    //height: 60%;
  } */

  &__logo {
    //display: inline-block;
    height: 8rem;
    display: block;
    grid-column: 1 / 6;
    grid-row: 1 / 2;

    /*     img {
      margin: 0.4em auto;
      max-width: 80%;
      max-height: 100%;
      display: block;
    } */
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

  /*   &__links {
    //margin-top: 0.4em;
    padding: 0.4em 0.8em 0.4em 0.8em;

    display: flex;
    align-items: center;
    justify-content: space-between;


  } */

  /*   &__link-container {
    display: flex;
    * {
      margin-right: 0.3em;
    }
  } */

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

    //margin-right: 0.4em;
  }

  /*   &__text {
    flex: 1;
    //padding-top: 0.8em;

    h3 {
      margin-top: 0.6em;
      margin-bottom: 0.3em;
    }

    p {
      font-size: 1.4rem;
      margin-bottom: 0.3em;
    }
  } */
}
</style>
