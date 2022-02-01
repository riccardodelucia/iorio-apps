<template>
  <div class="notification__bar" :class="notificationClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    notificationClass() {
      return `notification__bar--${this.notification.type}`;
    },
  },
};
</script>

<style></style>
