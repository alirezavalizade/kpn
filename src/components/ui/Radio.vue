<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
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
  <div>
    <label
      class="flex items-center space-x-1 text-sm font-medium p-6 border border-neutral-200/30 rounded-md"
    >
      <input
        v-bind="$attrs"
        :name="name"
        type="radio"
        v-model="value"
        class="w-6 h-6"
      />
      <span>
        {{ label }}
      </span>
    </label>
  </div>
</template>
