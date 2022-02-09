<template>
  <TheSidenav v-model="showSideNav"></TheSidenav>
  <div class="container" :class="app ? 'container--app' : 'container--web'">
    <div class="controller" v-if="app">
      <div class="menu" @click="onClick">
        <div class="menu__item"></div>
        <div class="menu__item"></div>
        <div class="menu__item"></div>
      </div>
    </div>
    <TheHeader></TheHeader>

    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
import TheSidenav from "@/components/TheSidenav";
import TheHeader from "@/components/TheHeader";

export default {
  name: "BaseAppLayout",
  components: { TheHeader, TheSidenav },
  methods: {
    onClick() {
      this.showSideNav = true;
    },
  },
  data() {
    return {
      showSideNav: false,
      app: false,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
