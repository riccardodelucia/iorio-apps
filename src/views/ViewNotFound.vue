<template>
  <main class="main">
    <BaseError
      :title="'Not found 🔍'"
      :msg="'The content you\'re looking for is not there.'"
    />
    <!--  <h2 class="u-text-align-center u-margin-bottom-small">Not found 🔍</h2>
    <p class="u-text-align-center u-margin-bottom-medium">
      The content you're looking for is not there.
    </p> -->
    <div class="u-center-content">
      <router-link :to="{ name: 'dashboard' }" style="text-decoration: none">
        <BaseButton type="button">Back to Dashboard</BaseButton>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  //title: "404 | Not Found",
  name: "ViewNotFound",
};
</script>
