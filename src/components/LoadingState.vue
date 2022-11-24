<script setup>
import { defineAsyncComponent } from "vue";

const LoadingIcon = defineAsyncComponent(() => import("@/vectors/loading.vue"));
</script>
<template>
  <div v-bind="$attrs">
    <LoadingIcon class="w-8 h-8 md:w-12 md:h-12 flex-shrink-0 align-middle" />
  </div>
</template>
