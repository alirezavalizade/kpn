<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { useKeyboard } from "@/functions/use";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const target = ref(null);

const emit = defineEmits(["close"]);

const handleClose = () => {
  if (!props.isOpen) {
    return;
  }

  emit("close");
};

useKeyboard(["Escape"], handleClose, "keyup");
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="isOpen"
        ref="target"
        class="fixed left-0 top-0 bottom-0 z-20 bg-black flex flex-col overflow-auto will-change-transform"
      >
        <slot> </slot>
      </div>
    </Transition>
    <div
      v-if="isOpen"
      @click="handleClose"
      class="absolute inset-0 z-10 bg-black/30"
    ></div>
  </Teleport>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  @apply transition-all duration-500;
}

.v-enter-from,
.v-leave-to {
  @apply -translate-x-full;
}
</style>
