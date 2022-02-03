<template>
  <div class="notification__bar" :class="notificationClass">
    <div class="notification__close" @click="onClick"></div>
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
  methods: {
    onClick() {
      this.$store.dispatch("notification/remove", this.notification);
    },
  },
};
</script>

<style></style>
