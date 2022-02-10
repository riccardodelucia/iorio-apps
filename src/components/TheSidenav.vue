<template>
  <div v-if="collapsible" class="controller">
    <div class="menu" @click="showSideNav = true">
      <div class="menu__item"></div>
      <div class="menu__item"></div>
      <div class="menu__item"></div>
    </div>
  </div>

  <nav
    class="sidenav"
    :class="{
      'sidenav--collapsible': collapsible,
      'sidenav--active': showSideNav,
    }"
  >
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
    <div v-if="collapsible" class="sidenav__close" @click="showSideNav = false">
      <span>hide</span><BaseIcon name="chevrons-left"></BaseIcon>
    </div>
  </nav>
</template>

<script>
import apps from "@/sidenav_apps.json";

export default {
  name: "TheSidenav",
  created() {
    this.collapsible = window.innerWidth < 1000;
  },
  computed: {
    app() {
      const key = Object.keys(apps).find((key) =>
        this.$route.path.includes(key)
      );
      return !key ? {} : { title: apps[key].title, links: apps[key].links };
    },
  },
  data() {
    return {
      collapsible: true,
      showSideNav: false,
    };
  },
};
</script>

<style lang="scss">
.controller {
  width: 8rem;
  background-color: var(--color-blue);
  color: white;
  padding: 1.5em 1em;
}

.menu {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  justify-content: space-between;

  &__item {
    height: 2px;
    background-color: white;
  }
}

.sidenav {
  width: 20rem;
  background-color: var(--color-blue);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 1em 0;

  &--collapsible {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    transform: translateX(-20rem);
    transition: transform 0.2s ease-out;
  }

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
