<template>
  <div class="heading">
    <h4>TOP COUNTRIES</h4>
    <p class="bodyM" v-if="selectedItem.value && selectedItem.label">
      <span>{{ (selectedItem.value * 100).toFixed(2) }}%</span> from
      <span>{{ getCountryName(selectedItem.label) }}</span>
    </p>
  </div>
  <div class="progress_bars_container">
    <div v-for="(value, label) in sortedCountries" :key="label" class="progress_bar_wrapper">
      <div class="label">
        <span class="bodyM">{{ getCountryName(label as string) }}</span>
        <span class="bodyM">{{ (value * 100).toFixed(2) }}%</span>
      </div>
      <div
        class="progress_bar_bg"
        :class="{ active: selectedItem.value === value && selectedItem.label === label }"
        @click="handleProgressClick(value, label as string)"
      >
        <div class="progress_bar" :style="{ width: `${(value * 100).toFixed(2)}%` }"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface ICountryDistribution {
  [key: string]: number
}

interface ISelectedItem {
  label: string
  value: number
}

import { defineProps, computed, ref } from 'vue'
import { CountryDistributionEnum } from '@/typeInterfaces/TypeInterface'

const props = defineProps<{
  countryData: ICountryDistribution
}>()

const selectedItem = ref<ISelectedItem>({
  value: 0,
  label: '',
})

const sortedCountries = computed<ICountryDistribution>(() => {
  return Object.entries(props.countryData)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc: ICountryDistribution, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
})

const handleProgressClick = (value: number, label: string) => {
  selectedItem.value.value = value
  selectedItem.value.label = label
}

const getCountryName = (key: string): string => {
  return CountryDistributionEnum[key as keyof typeof CountryDistributionEnum] || key
}
</script>

<style scoped>
.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.progress_bars_container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 2rem;
  height: 270px;
  overflow-y: auto;
  padding-right: 15px;
  margin-right: -15px;
}

.progress_bars_container::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.progress_bars_container::-webkit-scrollbar-track {
  background: #34374c;
  border-radius: 8px;
}

.progress_bars_container::-webkit-scrollbar-thumb {
  background: #51546b;
  border-radius: 8px;
}

.progress_bar_wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
}

.label {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--white-light);
}

.progress_bar_bg {
  width: 100%;
  height: 16px;
  background: #2c2f45;
  border: 1px solid #ffffff0a;
  box-shadow: 0px 5px 30px 0px #ffffff0d inset;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.progress_bar {
  height: 50%;
  background-color: var(--purple-color);
  box-shadow: 0px 0px 10px 1px #8c96ff40;
  border-radius: 10px;
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translatey(-50%);
  transition: 0.3s;
}

.progress_bar_bg:hover .progress_bar,
.progress_bar_bg.active .progress_bar {
  transition: 0.3s;
  background-color: var(--green-color);
  box-shadow: 0px 0px 10px 1px #64ffaa40;
}
</style>
