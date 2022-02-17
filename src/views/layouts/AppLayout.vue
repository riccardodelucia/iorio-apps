<template>
  <div class="layout layout--app">
    <TheSidenav v-model="showSideNav"></TheSidenav>
    <TheHeader layout="app"></TheHeader>
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
import TheSidenav from "@/components/TheSidenav";
import TheHeader from "@/components/TheHeader";

export default {
  name: "AppLayout",
  components: { TheHeader, TheSidenav },
};
</script>
