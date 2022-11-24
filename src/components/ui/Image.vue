<script setup>
import { defineProps } from "vue";

defineProps({
  src: {
    type: String,
    required: true,
  },
  loading: {
    type: String,
    default: "lazy",
  },

  fetchpriority: {
    type: String,
    default: "highest",
  },
});
</script>

<template>
  <img
    class="w-full block max-w-full select-none"
    draggable="false"
    :src="src"
    :loading="loading"
    :fetchpriority="fetchpriority"
    v-bind="$attrs"
  />
</template>
