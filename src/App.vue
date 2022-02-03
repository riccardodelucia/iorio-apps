<template>
  <router-view />
  <NotificationContainer></NotificationContainer>
</template>

<script>
import NotificationContainer from "@/components/NotificationContainer";

export default {
  components: { NotificationContainer },
};
</script>
