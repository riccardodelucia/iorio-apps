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
