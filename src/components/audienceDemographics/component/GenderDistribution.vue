<template>
  <h4>GENDER</h4>
  <div class="gender_distribution">
    <svg width="220" height="220" viewBox="0 0 36 36" fill="none">
      <defs>
        <linearGradient id="border_gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.05)" />
          <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
        </linearGradient>
      </defs>
      <!-- Background circle -->
      <circle
        class="trailbg"
        cx="18"
        cy="18"
        r="15.9155"
        stroke="#2C2F45"
        stroke-width="4"
        filter="url(#inset-shadow)"
      />
      <!-- Progress circle -->
      <circle
        class="progress"
        cx="18"
        cy="18"
        r="15.9155"
        stroke-width="1"
        :stroke-dasharray="`${circumference} ${circumference}`"
        :stroke-dashoffset="offset1"
        stroke-linecap="round"
      />
      <circle
        class="progress progress2"
        cx="18"
        cy="18"
        r="15.9155"
        stroke-width="1"
        :stroke-dasharray="`${circumference} ${circumference}`"
        :stroke-dashoffset="offset2"
        stroke-linecap="round"
      />
    </svg>
    <!-- Text in the center of the circle -->
    <div class="percentage_text titleL">{{ femalePercentage.toFixed(2) }}%</div>
    <div class="gender_label bodyM">{{ dominantGender }}</div>
  </div>
  <ul class="genderlist">
    <li>
      <span class="dot"></span
      ><span class="bodyM">Male: {{ convertToPercentage(props.genderData.MALE) }}</span>
    </li>
    <li>
      <span class="dot"></span
      ><span class="bodyM">Female: {{ convertToPercentage(props.genderData.FEMALE) }}</span>
    </li>
  </ul>
</template>
<script lang="ts" setup>
export interface IGenderDistribution {
  MALE: number
  FEMALE: number
}

import { defineProps, computed } from 'vue'
import { useCalculation } from '@/composables/CaculationHook'

const { convertToPercentage } = useCalculation()

const props = defineProps<{
  genderData: IGenderDistribution
}>()

const circumference = 2 * Math.PI * 15.9155

const femalePercentage = computed(() => props.genderData.FEMALE * 100)
const malePercentage = computed(() => props.genderData.MALE * 100)
const offset1 = computed(() => circumference * (1 - femalePercentage.value / 100))
const offset2 = computed(() => circumference * (1 - malePercentage.value / 100))
const dominantGender = computed(() => (femalePercentage.value > 50 ? 'Female' : 'Male'))
</script>

<style scoped>
.genderlist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
}
.genderlist li {
  display: flex;
  align-items: center;
  color: var(--white-light);
}
.genderlist li .dot {
  width: 6px;
  height: 6px;
  background-color: var(--purple-color);
  margin-right: 0.5rem;
  border-radius: 50%;
}
.genderlist li:nth-child(2) .dot {
  background-color: var(--green-color);
}
.gender_distribution {
  position: relative;
  display: table;
  margin: 1.5rem auto 0;
  width: 220px;
  height: 220px;
  text-align: center;
  color: #c0c0c0;
}

svg {
  transform: rotate(-180deg);
}
.trailbg {
  fill: none;
  stroke: #2c2f45;
}

.trail_gradient {
  fill: none;
  stroke-linecap: round;
  filter: drop-shadow(0px 5px 30px rgba(255, 255, 255, 0.05)) inset;
}

.progress {
  fill: none;
  stroke: var(--green-color);
  transition: stroke-dashoffset 0.35s;
  transform: rotate(0.25turn);
  transform-origin: 50% 50%;
  filter: drop-shadow(0px 5px 30px rgba(255, 255, 255, 0.05)) inset;
  box-shadow: inset 0px 5px 30px rgba(255, 255, 255, 0.05);
}
.progress2 {
  stroke: var(--purple-color);
  transition: stroke-dashoffset 0.35s;
  transform: rotate(1turn);
  transform-origin: 50% 50%;
  filter: drop-shadow(0px 5px 30px rgba(255, 255, 255, 0.05)) inset;
  box-shadow: inset 0px 5px 30px rgba(255, 255, 255, 0.05);
}

.percentage_text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  color: var(--green-color);
}

.gender_label {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--white-light);
}
</style>
