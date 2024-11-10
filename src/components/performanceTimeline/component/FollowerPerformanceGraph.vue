<template>
  <div class="line_chart">
    <Line :data="chartData" :options="chartOptions" class="graph" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { singleFollowerPerformance } from '../PerformanceTimeline.vue'

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
)

const props = defineProps<{
  followersData: singleFollowerPerformance[]
}>()

// const labels = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ]

const chartData = ref({
  labels: props.followersData.map((item) => {
    const date = new Date(item.date)
    return date.toLocaleString('default', { month: 'short', year: 'numeric' })
  }),
  datasets: [
    {
      data: props.followersData.map((item) => item.followers.value),
      fill: false,
      borderColor: '#8C96FF',
      tension: 0.1,
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
})
</script>
<style scoped></style>
