<template>
  <div class="web-container">
    <TheHeader></TheHeader>
    <div class="content"><slot></slot></div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  name: "BaseLayoutWebpage",
  components: { TheHeader, TheFooter },
};
</script>

<style></style>
