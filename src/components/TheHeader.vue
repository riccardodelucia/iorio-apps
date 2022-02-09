<template>
  <header class="header">
    <div class="content">
      <a
        href="https://humantechnopole.it/en/"
        target="_blank"
        class="header__logo-link"
        ><img
          src="@/assets/logos/ht-logo-white.svg"
          alt="HT logo"
          class="header__logo header__logo--ht"
      /></a>
      <a
        href="https://humantechnopole.it/en/research-groups/iorio-group/"
        target="_blank"
        class="header__logo-link"
        ><img
          src="@/assets/logos/iorio-white.svg"
          alt="Iorio logo"
          class="header__logo header__logo--iorio"
      /></a>

      <nav>
        <router-link class="header__link" to="/"
          ><BaseIcon name="grid"
        /></router-link>
        <a
          v-if="!keycloak.authenticated"
          to="#"
          class="header__link"
          @click="login"
          >Login</a
        >
        <User v-else></User>
      </nav>
    </div>
  </header>
</template>

<script>
import User from "@/components/User";

export default {
  name: "TheHeader",
  components: { User },
  inject: ["keycloak"],
  data() {
    return {
      currentUri: `${window.location.protocol}//${window.location.host}${this.$route.fullPath}`,
    };
  },
  methods: {
    login() {
      this.keycloak.login({ redirectUri: this.currentUri });
    },
  },
};
</script>

<style lang="scss">
.header {
  //height: 8rem;

  //grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(
    to right,
    var(--color-gradient-blue-0) 0%,
    var(--color-gradient-blue-100) 5%,
    var(--color-gradient-green-0) 95%,
    var(--color-gradient-green-100) 100%
  );
  background-size: cover;
  background-repeat: no-repeat;

  .content {
    flex: 1 1 150rem;
    padding: 1em 2em;

    grid-column: 2/ -2;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    nav {
      display: flex;
      align-items: center;
      gap: 2em;
      margin-left: auto;
    }
  }

  &__logo {
    width: auto;

    &--ht {
      height: 4rem;
    }

    &--iorio {
      height: 5.5rem;
    }
  }

  &__logo-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  &__link {
    color: white;
    text-decoration: none;
    font-weight: 400;
    cursor: pointer;

    &:hover {
      color: var(--color-text-dark-blue);
      transition: color 0.3s ease-in-out;
    }
  }
}
</style>
