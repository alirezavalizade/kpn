<script setup>
import { defineProps, computed } from "vue";

const CLASS_NAMES_BY_SIZE = {
  xs: "text-xs px-2 h-6 focus:ring-p-1 placeholder:text-xs",
  sm: "text-sm px-3 h-8 focus:ring-p-1 placeholder:text-sm",
  md: "text-md px-4 h-10 focus:ring-p-1 placeholder:text-sm",
  lg: "text-lg px-4 h-12 focus:ring-p-2 placeholder:text-sm",
};

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  size: {
    type: String,
    default: "lg",
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    return emit("update:modelValue", value);
  },
});
</script>

<template>
  <input
    class="appearance-none w-full outline-none transition-all duration-100 rounded-full focus:outline-none text-black-900 placeholder:text-black-700 placeholder:font-semibold focus:border-th-highlight focus:ring-blue-500 focus:ring-4"
    :class="[CLASS_NAMES_BY_SIZE[size]]"
    v-bind="$attrs"
    v-model="value"
  />
</template>
