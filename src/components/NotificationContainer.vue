<template>
  <div class="notification">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    ></NotificationBar>
  </div>
</template>

<script>
import NotificationBar from "@/components/NotificationBar";
import { mapState } from "vuex";
export default {
  components: { NotificationBar },
  computed: {
    ...mapState("notification", ["notifications"]),
  },
};
</script>

<style lang="scss">
.notification {
  position: fixed;
  top: 0;
  right: 0;

  &__bar {
    padding: 1em 2em;
    width: 30vw;
    margin-right: 1em;
    margin-top: 1em;

    &--success {
      background-color: rgb(121, 230, 121);
      border: 1px solid green;
      color: green;
    }

    &--error {
      background-color: rgb(255, 168, 168);
      border: 1px solid red;
      color: red;
    }
  }
}
</style>
