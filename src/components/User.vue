<template>
  <div tabindex="-1" class="user" v-click-outside="onClickOutside">
    <div class="user__name" @click="open = !open">
      {{ user }}
      <div></div>
    </div>
    <div v-show="open" class="user__menu">
      <a href="#" @click="logout">logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  inject: ["keycloak"],
  computed: {
    user() {
      const maxLength = 20;
      const name =
        this.$store.state.user.user?.firstName ||
        this.$store.state.user.user?.username ||
        "user";

      return name.length > maxLength
        ? name.substring(0, maxLength - 3).concat("...")
        : name;
    },
  },
  data() {
    return {
      open: false,
      logoutRedirectUri: `${window.location.protocol}//${window.location.host}/`,
    };
  },
  methods: {
    onClickOutside() {
      this.open = false;
    },
    logout() {
      this.keycloak.logout({ redirectUri: this.logoutRedirectUri });
    },
  },
};
</script>

<style lang="scss">
.user {
  position: relative;
  cursor: pointer;
  user-select: none;

  &__name {
    padding: 0.4em 0.8em;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
    div {
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: var(--color-text-dark-blue) transparent transparent
        transparent;
    }
  }

  &__menu {
    position: absolute;
    font-weight: normal;
    border: 1px solid var(--color-text-dark-blue);
    left: 0px;
    right: 0px;
    height: 4rem;
    background-color: #fff;
    padding: 0.4em 0.8em;

    a {
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    a:link,
    a:visited {
      color: inherit;
    }
  }
}
</style>
