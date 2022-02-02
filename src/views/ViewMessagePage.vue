<template>
  <div class="message-page">
    <BaseMessage :title="title" :message="message" />
    <button
      class="button button--primary button--large"
      type="button"
      @click="$router.push({ name: 'dashboard' })"
    >
      Back to Dashboard
    </button>
  </div>
</template>

<script>
export default {
  title: "Network Error",
  name: "ViewNetworkError",
  props: {
    title: { type: String, default: "" },
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.message-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

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
</style>
