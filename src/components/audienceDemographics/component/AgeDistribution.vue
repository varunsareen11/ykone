<template>
  <h4>AGE RANGE</h4>
  <div class="progress_bars_container">
    <div v-for="(value, label) in props.ageData" :key="label" class="progress_bar_wrapper">
      <div class="progress_bar_bg">
        <div class="progress_bar" :style="{ height: `${(value * 100).toFixed(2)}%` }"></div>
      </div>
      <label class="bodyM">{{ label }}</label>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface IAgeGroupDistribution {
  [key: string]: number
}

import { defineProps } from 'vue'
// import { useCalculation } from '@/composables/CaculationHook'

// const { convertToPercentage } = useCalculation()

const props = defineProps<{
  ageData: IAgeGroupDistribution
}>()
</script>

<style scoped>
.progress_bars_container {
  display: flex;
  gap: 20px;
  margin-top: 2rem;
}

.progress_bar_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
}

label {
  color: var(--white-light);
}

.progress_bar_bg {
  width: 16px;
  min-height: 220px;
  background: #2c2f45;
  border: 1px solid #ffffff0a;
  box-shadow: 0px 5px 30px 0px #ffffff0d inset;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.progress_bar {
  width: 50%;
  background-color: var(--purple-color);
  box-shadow: 0px 0px 10px 1px #8c96ff40;
  border-radius: 10px;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s;
}

.progress_bar_bg:hover .progress_bar {
  transition: 0.3s;
  background-color: var(--green-color);
  box-shadow: 0px 0px 10px 1px #64ffaa40;
}
</style>
