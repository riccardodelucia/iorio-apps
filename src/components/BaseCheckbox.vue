<template>
  <div class="checkbox">
    <div
      class="checkbox__input"
      @click="onClick"
      :class="{ 'checkbox__input--checked': modelValue }"
    >
      <input
        :id="uuid"
        ref="checkbox"
        hidden
        :checked="modelValue"
        type="checkbox"
        @change="onChange"
      />
      <span />
    </div>
    <label :for="uuid" v-if="label">{{ label }}</label>
  </div>
</template>

<script>
import UniqueID from "@/composables/uuid.js";
import { ref } from "vue";
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const uuid = UniqueID();
    const checkbox = ref(null);

    const onClick = () => {
      checkbox.value.click();
    };

    const onChange = (event) => {
      emit("update:modelValue", event.target.checked);
    };

    return { uuid, checkbox, onClick, onChange };
  },
};
</script>

<style lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  gap: 1em;
  &__input {
    width: 3rem;
    height: 3rem;
    background-color: var(--color-grey-light);
    position: relative;
    display: inline-block;
    &--checked {
      background-color: var(--color-blue-lighter);

      span {
        display: block;
      }
      span:after {
        content: "";
        position: absolute;
        left: 1rem;
        top: 0.5rem;
        width: 1rem;
        height: 1.5rem;
        border: solid white;
        border-width: 0 4px 4px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }
  label {
    cursor: pointer;
  }
}
</style>
