<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [Boolean, Array],
    default: false,
  },
  size: {
    type: String,
    default: "lg",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  index: {
    type: Number,
    default: 0,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    return emit("update:modelValue", value, props.index);
  },
});
</script>

<template>
  <div>
    <label
      class="flex items-center space-x-1 text-sm font-medium"
      :class="{ 'text-gray-600': isDisabled }"
    >
      <input
        v-bind="$attrs"
        :name="name"
        :disabled="isDisabled"
        type="checkbox"
        v-model="value"
        class="w-6 h-6 rounded focus:ring-blue-500 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
      />

      <span
        v-if="color"
        class="w-6 h-6 rounded-full"
        :style="{ backgroundColor: color }"
      ></span>

      <span class="truncate">
        {{ label }}
      </span>
    </label>
  </div>
</template>
