<template>
  <nav class="sidenav">
    <div class="sidenav__title">{{ app.title }}</div>
    <ul class="sidenav__list">
      <li
        v-for="link in app.links"
        class="sidenav__item"
        :key="link.id"
        @click="$router.push(link.url)"
        :class="{ 'sidenav__item--active': $route.path.includes(link.url) }"
      >
        <span class="sidenav__label">{{ link.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import apps from "@/sidenav_apps.json";

export default {
  name: "TheSidenav",
  computed: {
    app() {
      const key = Object.keys(apps).find((key) =>
        this.$route.path.includes(key)
      );
      return !key ? {} : { title: apps[key].title, links: apps[key].links };
    },
  },
};
</script>

<style lang="scss">
.sidenav {
  width: 20rem;
  background-color: var(--color-blue);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  &__title {
    padding: 0.5em 0.2em;
    font-weight: bold;
    color: white;
  }

  &__label {
    transition: transform 0.3s ease-in-out;
  }

  &__list {
    font-size: 1.8rem;
    list-style: none;
    //padding: 0.5em;
    //margin-top: 2em;
    font-weight: 400;
    align-self: stretch;
  }

  &__item {
    &--active {
      background-color: var(--color-green-lighter);
    }
    padding: 0.2em 0.3em;
    * {
      display: block;
      width: 100%;
      color: white;
      //text-transform: uppercase;
      text-decoration: none;
      padding: 1rem 2rem;
    }

    &:not(:last-child) {
      margin-bottom: 0.2em;
    }

    &:hover,
    &:focus {
      cursor: pointer;
      background-color: var(--color-green-lighter);
      .sidenav__label {
        transform: translateX(0.5em);
        transition: transform 0.3s ease-in-out;
      }
    }
  }
}
</style>
