<template>
  <div class="notification__bar" :class="notificationClass">
    <a class="notification__close" @click="onClick"></a>
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
