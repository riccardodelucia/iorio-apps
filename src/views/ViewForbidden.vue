<template>
  <main class="main">
    <BaseError
      :title="'Forbidden 🚫'"
      :msg="'You have not permission to access this resource'"
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
  //title: "Unauthorized",
  name: "ViewUnauthorized",
  props: {},
};
</script>
