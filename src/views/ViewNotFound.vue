<template>
  <div class="not-found">
    <BaseMessage
      :title="'Not found 🔍'"
      :message="'The content you\'re looking for is not there.'"
    />
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
  name: "ViewNotFound",
};
</script>

<style lang="scss">
.not-found {
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
