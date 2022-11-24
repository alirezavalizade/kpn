<script setup>
import { defineProps, computed, defineEmits } from "vue";

import CheckboxGroup from "@/components/ui/CheckboxGroup.vue";
import RadioGroup from "@/components/ui/RadioGroup.vue";
import Button from "@/components/ui/Button.vue";

import FilterHeader from "./FilterHeader.vue";

import {
  getManufacturerOptions,
  getColorOptions,
  getNetworkOptions,
  getOperatingSystemOptions,
  getEsimOptions,
  getRefurbishedOptions,
} from "./helpers";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
  filteredDataByManufacturer: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "reset"]);

const filters = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    return emit("update:modelValue", value);
  },
});

const sortOptions = [
  {
    label: "Most sold",
    value: "default",
  },
  {
    label: "New",
    value: "new",
  },
  {
    label: "Promotion",
    value: "promotion",
  },
];

const manufacturerOptions = computed(() => {
  return getManufacturerOptions({ data: props.data });
});

const colorOptions = computed(() => {
  return getColorOptions({
    data: props.data,
    filteredDataByManufacturer: props.filteredDataByManufacturer,
  });
});

const networkOptions = computed(() => {
  return getNetworkOptions({ data: props.data });
});

const operatingSystemOptions = computed(() => {
  return getOperatingSystemOptions({ data: props.data });
});

const esimOptions = computed(() => {
  return getEsimOptions({ data: props.data });
});

const refurbishedOptions = computed(() => {
  return getRefurbishedOptions({ data: props.data });
});
</script>

<template>
  <div
    class="md:bg-neutral-900 w-[400px] md:w-full rounded-md p-6 sm:p-8 space-y-8"
  >
    <div class="block md:hidden space-y-2">
      <FilterHeader> Reset all filter </FilterHeader>
      <Button @click="emit('reset')" class="uppercase !w-full" size="sm">
        reset all
      </Button>
    </div>

    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <FilterHeader> Sort </FilterHeader>
        <div class="hidden md:block">
          <Button @click="emit('reset')" class="uppercase" size="sm">
            reset all
          </Button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RadioGroup
          name="sortBy"
          :options="sortOptions"
          v-model="filters.sortBy"
        />
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10 xl:gap-4"
    >
      <div>
        <FilterHeader :filterLength="filters.manufacturer.length">
          Brand
        </FilterHeader>
        <div class="flex flex-col space-y-2 mt-4">
          <CheckboxGroup
            name="manufacturer"
            :options="manufacturerOptions"
            v-model="filters.manufacturer"
          />
        </div>
      </div>
      <div>
        <FilterHeader :filterLength="filters.color.length">
          Color
        </FilterHeader>
        <div class="flex flex-col space-y-2 mt-4">
          <CheckboxGroup
            name="manufacturer"
            :options="colorOptions"
            v-model="filters.color"
          />
        </div>
      </div>
      <div>
        <FilterHeader :filterLength="filters.network.length"> 5G </FilterHeader>
        <div class="flex flex-col space-y-2 mt-4">
          <CheckboxGroup
            name="manufacturer"
            :options="networkOptions"
            v-model="filters.network"
          />
        </div>
      </div>
      <div>
        <FilterHeader :filterLength="filters.operatingSystem.length">
          Operating system
        </FilterHeader>
        <div class="flex flex-col space-y-2 mt-4">
          <CheckboxGroup
            name="manufacturer"
            :options="operatingSystemOptions"
            v-model="filters.operatingSystem"
          />
        </div>
      </div>
      <div>
        <FilterHeader :filterLength="filters.esim.length"> E-SIM </FilterHeader>
        <div class="flex flex-col space-y-2 mt-4">
          <CheckboxGroup
            name="manufacturer"
            :options="esimOptions"
            v-model="filters.esim"
          />
        </div>
      </div>
      <div>
        <FilterHeader :filterLength="filters.refurbished.length">
          Refurbished
        </FilterHeader>
        <div class="flex flex-col space-y-2 mt-4">
          <CheckboxGroup
            name="manufacturer"
            :options="refurbishedOptions"
            v-model="filters.refurbished"
          />
        </div>
      </div>
    </div>
  </div>
</template>
