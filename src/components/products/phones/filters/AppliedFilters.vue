<script setup>
import { defineProps, computed } from "vue";

import { booleanMap, filterMap } from "@/constants";

import Button from "@/components/ui/Button.vue";
import CloseIcon from "@/vectors/close.vue";

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({}),
  },
});

const appliedFilters = computed(() => {
  return Object.entries(props.filters).filter(([, value]) => {
    return Array.isArray(value);
  });
});

const hasFilters = computed(() => {
  return (
    appliedFilters.value.filter(([, value]) => {
      return value.length;
    }).length > 0
  );
});
</script>

<template>
  <div
    class="snap-x snap-mandatory overflow-x-auto flex items-center space-x-4 py-1"
    v-if="hasFilters"
  >
    <template v-for="[filterName, filters] in appliedFilters" :key="filterName">
      <template v-for="filter in filters" :key="filter">
        <div class="snap-start">
          <Button
            size="sm"
            variant="info"
            class="uppercase"
            @click="$emit('remove', { filterName, filter })"
          >
            <span>
              {{ filterMap[filterName] ? `${filterMap[filterName]}:` : "" }}
              {{ typeof filter === "boolean" ? booleanMap[filter] : filter }}
            </span>

            <span class="pl-2">
              <CloseIcon class="w-6 h-6" />
            </span>
          </Button>
        </div>
      </template>
    </template>
  </div>
</template>
