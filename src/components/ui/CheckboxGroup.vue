<script setup>
import { defineProps, defineEmits, computed } from "vue";
import Checkbox from "@/components/ui/Checkbox.vue";

const props = defineProps({
  modelValue: {
    type: Array,
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
  <Checkbox
    v-for="(option, index) in options"
    :key="option.value"
    :name="name"
    :label="option.label"
    :value="option.value"
    :color="option.color"
    :isDisabled="option.isDisabled"
    :index="index"
    v-model="value"
  />
</template>
