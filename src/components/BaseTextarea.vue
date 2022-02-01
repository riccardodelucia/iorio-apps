<template>
  <label :for="uuid" class="input__label" v-if="label">{{ label }}</label>
  <textarea
    :id="uuid"
    class="input"
    :value="modelValue"
    v-bind="$attrs"
    @input="onInput"
  >
  </textarea>
  <small class="input__error" v-if="error">{{ error }}</small>
</template>

<script>
import UniqueID from "@/composables/uuid.js";

export default {
  name: "BaseTextArea",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const uuid = UniqueID();

    const onInput = (event) => emit("update:modelValue", event.target.value);
    return {
      uuid,
      onInput,
    };
  },
};
</script>
