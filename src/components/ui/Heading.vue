<script setup>
import { defineProps } from "vue";

defineProps({
  is: {
    type: String,
    default: "h1",
  },
});
</script>

<template>
  <component :is="is" class="leading-normal" v-bind="$attrs">
    <slot></slot>
  </component>
</template>
