<script setup>
import GradientRightDark from "@/vectors/gradient-right-dark.vue";
import GradientLeftDark from "@/vectors/gradient-left-dark.vue";

import Phones from "@/components/products/phones/Phones.vue";
</script>

<template>
  <main role="main" class="flex flex-1 container mx-auto z-10">
    <Phones />
  </main>
  <GradientLeftDark
    class="fixed pointer-events-none z-0 -left-1/4 -bottom-2/4 -right-2/4 max-w-full"
  />
  <GradientRightDark
    class="fixed pointer-events-none z-0 -top-2/4 -right-2/4 max-w-full"
  />
</template>
