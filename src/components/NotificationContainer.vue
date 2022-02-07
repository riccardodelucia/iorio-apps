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
    min-width: 30vw;
    margin-right: 1em;
    margin-top: 1em;
    position: relative;

    &--success {
      background-color: rgb(121, 230, 121);
      border: 1px solid green;
      color: green;

      &__close {
        border-color: green;
      }
      .notification__close:before,
      .notification__close:after {
        background-color: green;
      }
    }

    &--error {
      background-color: rgb(255, 168, 168);
      border: 1px solid red;
      color: red;

      &__close {
        border-color: red;
      }

      .notification__close:before,
      .notification__close:after {
        background-color: red;
      }
    }
  }

  &__close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 2.4rem;
    height: 2.4rem;
    opacity: 0.3;
    background-color: white;
    border: 1px solid;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.1s ease-in;

    &:hover {
      opacity: 1;
    }

    &:before,
    &:after {
      position: absolute;
      left: 10px;
      top: 5px;
      content: " ";
      height: 12px;
      width: 2px;
      //background-color: black;
      opacity: 0.7;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}
</style>
