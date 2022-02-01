<template>
  <label :for="uuid" class="input__label" v-if="label">{{ label }}</label>
  <input
    :id="uuid"
    class="input"
    :value="modelValue"
    v-bind="$attrs"
    @input="onInput"
  />
  <small class="input__error" v-if="error">{{ error }}</small>
</template>

<script>
import UniqueID from "@/composables/uuid.js";

export default {
  name: "BaseInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const uuid = UniqueID();
    const onInput = (event) => {
      emit("update:modelValue", event.target.value);
    };
    return {
      uuid,
      onInput,
    };
  },
};
</script>
