<template>
  <main class="main">
    <BaseError
      :title="'Something went wrong... 💥'"
      :msg="'An error occurred. Please try again.'"
    />
    <div class="u-center-content">
      <router-link
        :to="{ name: 'dashboard' }"
        style="display: inline-block; text-decoration: none"
      >
        <BaseButton type="button">Back to Dashboard</BaseButton>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  //title: "Error",
  name: "ViewError",
  props: {},
};
</script>
