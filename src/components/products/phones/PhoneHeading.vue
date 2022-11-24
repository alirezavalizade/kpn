<script setup>
import { defineProps, defineAsyncComponent } from "vue";
import Heading from "@/components/ui/Heading.vue";
import IconButton from "@/components/ui/IconButton.vue";

const CloseIcon = defineAsyncComponent(() => import("@/vectors/close.vue"));
const FilterIcon = defineAsyncComponent(() => import("@/vectors/filter.vue"));

defineProps({
  isFiltersOpen: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex justify-between items-center">
    <Heading as="h1" class="text-xl sm:text-2xl xl:text-4xl font-bold">
      Phones
    </Heading>
    <IconButton size="lg" @click="$emit('toggle')" variant="inverted">
      <CloseIcon class="w-6 h-6" v-if="isFiltersOpen" />
      <FilterIcon v-else class="w-6 h-6" />
    </IconButton>
  </div>
</template>
