<script setup>
import { defineProps } from "vue";

import GridList from "@/components/ui/GridList.vue";
import PhoneItem from "@/components/products/phones/PhoneItem.vue";

defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="flex-1">
    <GridList :data="data" :isLoading="isLoading">
      <template v-slot="{ item }">
        <PhoneItem :data="item"> </PhoneItem>
      </template>
    </GridList>
  </div>
</template>
