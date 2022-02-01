<template>
  <main class="main">
    <BaseError
      :title="'Something went wrong... 💥'"
      :msg="'A network error occurred. Please try again.'"
    />
    <div class="u-center-content">
      <router-link
        :to="{ name: 'dashboard' }"
        style="display: inline-block; text-decoration: none"
      >
        <BaseButton type="button">Back to web apps list</BaseButton>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  title: "Network Error",
  name: "ViewNetworkError",
  props: {},
};
</script>
