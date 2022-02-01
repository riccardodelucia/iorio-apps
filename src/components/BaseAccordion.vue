<template>
  <div class="accordion">
    <div class="accordion__label" @click="isOpen = !isOpen">
      <div class="accordion__title">
        <h3><slot name="title"></slot></h3>
      </div>

      <div
        class="accordion__icon"
        :class="{
          'accordion__icon--rotate-180': isOpen,
          'accordion__icon--rotate-0': !isOpen,
        }"
      >
        <BaseIcon name="chevron-up"></BaseIcon>
      </div>
    </div>
    <div
      class="accordion__content u-margin-top-medium"
      v-show="isOpen"
      :class="{
        'accordion__content--closed': !isOpen,
      }"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseAccordion",
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style lang="scss">
.accordion {
  &__label {
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    min-height: 2em;
    padding: 0.2em 0.3em;
  }

  &__icon {
    transition: transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    &--rotate-180 {
      transform: rotate(-180deg);
    }

    &--rotate-0 {
      transform: rotate(0deg);
    }
  }

  &__content {
    padding: 0 0.3em;
    //transition: transform 0.6s ease-in;
    min-height: 100%;

    &--closed {
      transform: translateY(-100%);
      max-height: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.8s;
    }
    .fade-enter,
    .fade-leave-to {
      transform: translateY(1000px);
    }
  }
}
</style>
