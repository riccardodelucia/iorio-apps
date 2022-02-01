<template>
  <div class="app-container">
    <TheHeaderApp></TheHeaderApp>
    <TheSidenav></TheSidenav>
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
import TheHeaderApp from "@/components/TheHeaderApp";
import TheSidenav from "@/components/TheSidenav";

export default {
  name: "BaseAppLayout",
  components: { TheHeaderApp, TheSidenav },
};
</script>

<style></style>
