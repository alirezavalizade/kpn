<script setup>
import { defineProps } from "vue";
import Heading from "@/components/ui/Heading.vue";

defineProps({
  filterLength: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <Heading class="flex items-center text-xl sm:text-2xl space-x-2">
    <span>
      <slot></slot>
    </span>
    <span
      v-if="filterLength > 0"
      class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-800 text-sm"
    >
      {{ filterLength }}
    </span>
  </Heading>
</template>
