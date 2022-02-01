<template>
  <header class="header header--app">
    <div class="content">
      <a
        href="https://humantechnopole.it/en/"
        target="_blank"
        class="header__logo-link"
        ><img
          src="@/assets/logos/ht-logo-color.svg"
          alt="HT logo"
          class="header__logo header__logo--ht"
      /></a>
      <a
        href="https://humantechnopole.it/en/research-groups/iorio-group/"
        target="_blank"
        class="header__logo-link"
        ><img
          src="@/assets/logos/iorio-logo-color.svg"
          alt="Iorio logo"
          class="header__logo header__logo--iorio"
      /></a>
      <User class="header__user"></User>
    </div>
    <div class="header__decoration"></div>
  </header>
</template>

<script>
import User from "@/components/User";
export default {
  name: "TheHeaderApp",
  components: { User },
};
</script>

<style lang="scss">
.header {
  &--app {
    display: grid;
    grid-template-rows: repeat(min-content);
    grid-template-columns: 1fr;

    .content {
      padding: 1em 2em;
      grid-row: 1 / 2;
      grid-column: 1/-1;
      //padding: 0 2em;
      display: flex;
      gap: 2em;
      flex-wrap: wrap;
    }

    .header__decoration {
      height: 1rem;
      grid-row: 2 / 3;
      grid-column: 1/-1;
      background-image: linear-gradient(
        to right,
        var(--color-gradient-blue-0) 0%,
        var(--color-gradient-blue-100) 5%,
        var(--color-gradient-green-0) 95%,
        var(--color-gradient-green-100) 100%
      );

      background-size: cover;
      background-repeat: no-repeat;
    }

    .header__user {
      margin-left: auto;
      align-self: center;
    }
  }
}
</style>
