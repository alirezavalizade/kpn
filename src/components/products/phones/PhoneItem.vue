<script setup>
import groupBy from "lodash/groupBy";

import { defineProps, ref, computed } from "vue";
import { getMainImageUrl } from "@/functions/assets";

import Heading from "@/components/ui/Heading.vue";
import Image from "@/components/ui/Image.vue";
import IconButton from "@/components/ui/IconButton.vue";
import ArrowIcon from "@/vectors/arrow-right.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const variantsByColor = computed(() => {
  return Object.entries(groupBy(props.data.variants, "attributes.color"));
});

// METHODS
const findTheRightVariantIndex = ({ slug }) => {
  return variantsByColor.value.findIndex(([key, values]) => {
    return values.find((variant) => {
      return key === variant.attributes.color && variant.slug === slug;
    });
  });
};

const setCurrentVariantIndex = (index) => {
  currentVariantIndex.value = index;
};

// DATA
const currentVariantIndex = ref(
  findTheRightVariantIndex({ slug: props.data.default })
);

// COMPUTED PROPERTIES
const currentVariant = computed(() => {
  return props.data.variants[currentVariantIndex.value];
});

const imageUrl = computed(() => {
  if (!currentVariant.value) {
    return;
  }

  return getMainImageUrl({ id: currentVariant.value.id });
});
</script>

<template>
  <div class="bg-neutral-900 rounded-md overflow-hidden p-6 sm:p-8 space-y-8">
    <div class="flex items-center justify-center relative md:aspect-square">
      <div>
        <Image
          v-if="imageUrl"
          class="max-w-[120px] md:max-w-[140px] lg:max-w-[240px]"
          :src="imageUrl"
        />
      </div>
      <div
        class="flex items-center flex-col space-y-2 absolute inset-y-0 right-0"
      >
        <div
          v-for="([, color], index) in variantsByColor"
          :key="color[0].attributes.color_code"
          role="button"
          class="w-8 h-8 rounded-full"
          :class="{ 'ring ring-blue-800': index === currentVariantIndex }"
          :style="{ backgroundColor: color[0].attributes.color_code }"
          @click="setCurrentVariantIndex(index)"
        ></div>
      </div>
    </div>
    <div class="flex items-end justify-between">
      <div class="flex flex-col">
        <Heading is="p" class=""> {{ data.manufacturer }} </Heading>
        <Heading is="h4" class="font-black text-lg md:text-xl">
          {{ data.model }}
        </Heading>
      </div>

      <IconButton>
        <ArrowIcon class="w-4 h-4"></ArrowIcon>
      </IconButton>
    </div>
  </div>
</template>
