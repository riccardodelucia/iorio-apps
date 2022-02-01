<template>
  <transition name="fade">
    <div class="modal" @click.self="$emit('modal-close')">
      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header" />
          <a class="modal__close" @click="$emit('modal-close')"></a>
        </div>
        <div class="modal__body">
          <slot name="body" />
        </div>
        <div class="modal__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "BaseModal",
};
</script>

<style lang="scss" scoped>
.modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.8);

  &__close {
    position: absolute;
    right: 1em;
    top: 1em;
    width: 3rem;
    height: 3rem;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }
    &:before,
    &:after {
      position: absolute;
      content: " ";
      height: 33px;
      width: 2px;
      background-color: #333;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }

  &__dialog {
    background-color: #ffffff;
    position: relative;
    width: fit-content;
    height: fit-content;
    margin: 2rem auto;
    border-radius: 5px;
    z-index: 2;
  }

  &__header,
  &__footer {
    min-height: 3em;
    padding: 1em;
    text-align: center;
  }

  &__body {
    padding: 1em 2em;
    min-width: 1000px;
    min-height: 500px;
    display: flex;
    justify-content: center;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
