<script setup>
import { defineProps, defineEmits, computed } from "vue";
import Radio from "@/components/ui/Radio.vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
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
  <Radio
    v-for="option in options"
    :key="option.value"
    :name="name"
    :label="option.label"
    :value="option.value"
    v-model="value"
  />
</template>
