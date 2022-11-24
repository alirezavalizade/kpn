<script setup>
import { defineProps } from "vue";
import Button from "@/components/ui/Button.vue";

const CLASS_NAMES_BY_SIZE = {
  xxs: "w-4",
  xs: "w-6",
  sm: "w-40",
  md: "w-10",
  lg: "w-12",
};

defineProps({
  size: {
    type: String,
    default: "md",
  },
  isRound: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <Button
    class="pl-0 pr-0"
    :class="[CLASS_NAMES_BY_SIZE[size]]"
    v-bind="{ ...$props, ...$attrs }"
  >
    <slot class="flex-shrink-0 align-middle fill-current"> </slot>
  </Button>
</template>
