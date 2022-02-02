<template>
  <label :for="uuid" class="input__label" v-if="label">{{ label }}</label>
  <div>
    <button class="input--file" type="button" v-bind="$attrs" @click="onClick">
      <BaseIcon name="upload" />
    </button>
    <span>{{ fileName }}</span>
  </div>
  <input
    :id="uuid"
    class="input"
    type="file"
    ref="inputFile"
    @change="updateFile"
  />
  <small class="input__error" v-if="error">{{ error }}</small>
</template>

<script>
import { ref, computed } from "vue";
import UniqueID from "@/composables/uuid.js";

export default {
  props: {
    label: { type: String, default: "" },
    modelValue: {
      type: File,
      default: null,
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const uuid = UniqueID();
    const inputFile = ref(null);

    const onClick = () => {
      inputFile.value.click();
    };
    const updateFile = (event) => {
      emit("update:modelValue", event.target.files[0]);
    };

    const fileName = computed(() => {
      return props.modelValue?.name || "";
    });
    return { inputFile, uuid, onClick, updateFile, fileName };
  },
};
</script>

<style lang="scss">
.input--file {
  width: 10rem;
  display: inline-block;
  margin-right: 0.3em;
}
</style>
