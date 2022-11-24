<script setup>
import { defineProps } from "vue";
import { defineAsyncComponent } from "vue";

import Heading from "@/components/ui/Heading.vue";
const LoadingState = defineAsyncComponent(() =>
  import("@/components/LoadingState.vue")
);

defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  template: {
    type: String,
    default: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <LoadingState v-if="isLoading" />
  <div
    class="grid gap-6"
    :class="template"
    v-bind="$attrs"
    v-else-if="data.length"
  >
    <slot v-for="(item, index) in data" :key="item.id" v-bind="{ item, index }">
    </slot>
  </div>
  <div v-else class="flex items-center justify-center py-12 px-4">
    <Heading> NO RESULT FOUND </Heading>
  </div>
</template>
