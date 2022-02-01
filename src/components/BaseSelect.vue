<template>
  <label class="input__label" v-if="label">{{ label }}</label>
  <div class="select" tabindex="0" @blur="open = false">
    <div
      class="select__selection"
      :class="{
        'select__selection--open': open,
        'select__selection--empty': Object.keys(modelValue).length === 0,
      }"
      @click="open = !open"
    >
      {{ selection }}
    </div>
    <div class="select__options" v-show="open">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          open = false;
          $emit('update:modelValue', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
  <small class="input__error" v-if="error">{{ error }}</small>
</template>

<script>
export default {
  props: {
    label: { type: String, default: "" },
    options: {
      type: Array,
      required: true,
    },
    error: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Select an option",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    selection() {
      return this.modelValue || this.placeholder;
    },
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>
