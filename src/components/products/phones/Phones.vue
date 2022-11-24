<script setup>
import { MIN_WIDTH } from "@/constants/media-query";

import { onMounted, ref, reactive, computed } from "vue";
import { useToggle, useWindowSize } from "@/functions/use";

import { loadPhones } from "@/api/products";

import Drawer from "@/components/ui/modal/Drawer.vue";
import PhoneHeading from "@/components/products/phones/PhoneHeading.vue";
import PhoneFilters from "@/components/products/phones/filters/PhoneFilters.vue";
import AppliedFilters from "@/components/products/phones/filters/AppliedFilters.vue";
import PhoneList from "@/components/products/phones/PhoneList.vue";

import { sortPhones, getFilteredPhones } from "./helpers";

const initialFilters = {
  sortBy: "default",
  manufacturer: [],
  color: [],
  network: [],
  operatingSystem: [],
  refurbished: [],
  esim: [],
};

const data = ref([]);
const isLoading = ref(true);
const filters = reactive({ ...initialFilters });

onMounted(() => {
  loadData();
});

const { width: windowWidth } = useWindowSize();

async function loadData() {
  // set true while revalidating
  isLoading.value = true;

  try {
    const { products } = await loadPhones();
    data.value = products;
  } catch (error) {
    console.log("failed to load phones...", error);
  } finally {
    isLoading.value = false;
  }
}

const [isFiltersOpen, toggleFilterForm] = useToggle(false);

const removeFilters = ({ filterName, filter }) => {
  Object.keys(filters).forEach((key) => {
    if (key === filterName) {
      filters[key] = filters[key].filter((item) => {
        return item !== filter;
      });
    }
  });
};

const resetFilters = () => {
  Object.assign(filters, initialFilters);
};

const computedData = computed(() => {
  const filteredData = getFilteredPhones({
    data: data.value,
    filters,
  });

  return sortPhones({ data: filteredData, sortBy: filters.sortBy });
});
</script>

<template>
  <div class="flex flex-col flex-1 space-y-8 py-8 px-6 md:px-0 overflow-hidden">
    <PhoneHeading @toggle="toggleFilterForm" :isFiltersOpen="isFiltersOpen" />
    <Drawer
      v-if="windowWidth <= MIN_WIDTH.MD"
      :isOpen="isFiltersOpen"
      @close="toggleFilterForm"
    >
      <PhoneFilters
        v-if="isFiltersOpen"
        v-model="filters"
        :data="data"
        @toggle="toggleFilterForm"
        @reset="resetFilters"
      />
    </Drawer>
    <KeepAlive v-else>
      <PhoneFilters
        v-if="isFiltersOpen"
        v-model="filters"
        :data="data"
        @toggle="toggleFilterForm"
        @reset="resetFilters"
      />
    </KeepAlive>
    <AppliedFilters :filters="filters" @remove="removeFilters" />
    <PhoneList :data="computedData" :isLoading="isLoading" />
  </div>
</template>
