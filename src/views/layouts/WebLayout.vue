<template>
  <div class="layout layout--web">
    <TheHeader layout="web"></TheHeader>
    <div class="content"><slot></slot></div>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  name: "WebLayout",
  components: { TheHeader, TheFooter },
};
</script>
