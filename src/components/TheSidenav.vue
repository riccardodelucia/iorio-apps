<template>
  <nav class="sidenav" :class="{ 'sidenav--active': modelValue }">
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
    <div
      class="sidenav__close"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span>hide</span><BaseIcon name="chevrons-left"></BaseIcon>
    </div>
  </nav>
</template>

<script>
import apps from "@/sidenav_apps.json";

export default {
  name: "TheSidenav",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
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
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
  transform: translateX(-20rem);
  transition: transform 0.2s ease-out;
  padding: 1em 0;

  &--active {
    transform: none;
  }

  &__close {
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5em;
    cursor: pointer;
    font-size: 2.5rem;
  }

  &__title {
    font-weight: bold;
    color: white;
  }

  &__label {
    transition: transform 0.3s ease-in-out;
  }

  &__list {
    font-size: 1.8rem;
    list-style: none;
    font-weight: 400;
    align-self: stretch;
    margin-bottom: auto;
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
