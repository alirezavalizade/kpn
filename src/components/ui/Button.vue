<script setup>
import { defineProps, defineAsyncComponent } from "vue";

const LoadingIcon = defineAsyncComponent(() => import("@/vectors/loading.vue"));

// eslint-disable-next-line no-unused-vars
const VARIANT_CLASS_NAMES = {
  info: ["bg-blue-500 text-white", "focus:ring-white focus:ring-2"],
  inverted: ["bg-white text-black focus:ring-black focus:ring-2"],
};

// eslint-disable-next-line no-unused-vars
const CLASS_NAMES_BY_SIZE = {
  xs: "text-xs h-6 x-2",
  sm: "text-sm h-8 px-7",
  md: "text-md h-10 px-4",
  lg: "text-lg h-12 px-6",
};

const LOADING_SIZE = {
  xs: "w-4 h-4",
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
};

defineProps({
  is: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "info",
  },
  size: {
    type: String,
    default: "md",
  },
  isRound: Boolean,
  isLoading: Boolean,
  isDisabled: Boolean,
});
</script>

<template>
  <component
    :is="is"
    class="inline-flex items-center align-middle select-none justify-center relative whitespace-nowrap leading-tight transition-all duration-200 outline-none appearance-none touch-manipulation font-semibold focus:outline-none"
    :class="{
      [CLASS_NAMES_BY_SIZE[size]]: true,
      [VARIANT_CLASS_NAMES[variant]]: true,
      'cursor-not-allowed': isDisabled,
      'rounded-full': isRound,
      'rounded-md': !isRound,
    }"
    :disabled="isDisabled"
    v-bind="$attrs"
  >
    <LoadingIcon
      v-if="isLoading"
      class="flex-shrink-0 align-middle"
      :class="[LOADING_SIZE[size]]"
    />
    <slot v-else> </slot>
  </component>
</template>
