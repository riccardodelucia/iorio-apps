<template>
  <div class="toggle__container">
    <span
      class="toggle__wrapper"
      role="checkbox"
      :aria-checked="modelValue.toString()"
      tabindex="0"
      @click="toggle"
      @keydown.space="toggle"
    >
      <span class="toggle__background" :class="backgroundModifierClass" />
      <span class="toggle__indicator" :class="indicatorModifierClass" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    backgroundModifierClass() {
      return {
        "toggle__background--on": this.modelValue,
        "toggle__background--off": !this.modelValue,
      };
    },
    indicatorModifierClass() {
      return {
        "toggle__indicator--on": this.modelValue,
        "toggle__indicator--off": !this.modelValue,
      };
    },
  },
  methods: {
    toggle() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>

<style lang="scss">
.toggle {
  &__container {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
  }

  &__wrapper {
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: 4.5rem;
    height: 3rem;
    border-radius: 9999px;
    &:focus {
      outline: 0;
    }
  }
  &__background {
    display: inline-block;
    border-radius: 9999px;
    height: 100%;
    width: 100%;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.4s ease;
    &--off {
      background-color: var(--color-grey-dark);
    }
    &--on {
      background-color: var(--color-blue-lighter);
    }
  }
  &__indicator {
    position: absolute;
    height: 2.5rem;
    width: 2.5rem;
    left: 0.1em;
    bottom: 0.15em;
    background-color: #ffffff;
    border-radius: 9999px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease;

    &--on {
      transform: translate(1.7rem);
    }
  }
}
</style>
