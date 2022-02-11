<template>
  <WebLayout v-if="$route.meta.layout === 'web'"><router-view /></WebLayout>
  <AppLayout v-if="$route.meta.layout === 'app'"><router-view /></AppLayout>
  <MessageLayout v-if="$route.meta.layout === 'msg'"
    ><router-view
  /></MessageLayout>
  <NotificationContainer></NotificationContainer>
</template>

<script>
import NotificationContainer from "@/components/NotificationContainer";
import WebLayout from "@/views/layouts/WebLayout";
import AppLayout from "@/views/layouts/AppLayout";
import MessageLayout from "@/views/layouts/MessageLayout";

export default {
  components: { NotificationContainer, WebLayout, AppLayout, MessageLayout },
};
</script>
