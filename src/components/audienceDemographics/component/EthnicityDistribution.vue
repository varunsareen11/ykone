<template>
  <div class="heading">
    <h4>TOP ETHNICITIES</h4>
    <p class="bodyM" v-if="selectedItem.value && selectedItem.label">
      <span>{{ (selectedItem.value * 100).toFixed(2) }}%</span> from
      <span>{{ selectedItem.label }}</span>
    </p>
  </div>
  <div class="radar_chart_container">
    <Radar :data="data" :options="options" class="graph" ref="radarChart" />
  </div>
</template>
<script lang="ts" setup>
interface IEthnicityCollection {
  code: string
  name: string
  weight: number
}

import { defineProps, ref } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps<{
  ethnicityData: IEthnicityCollection[]
}>()

const radarChart = ref(null)
const selectedItem = ref({
  value: 0,
  label: '',
})

const data = {
  labels: props.ethnicityData.map((ethnicity) => ethnicity.name),
  datasets: [
    {
      data: props.ethnicityData.map((ethnicity) => ethnicity.weight),
      backgroundColor: 'transparent',
      pointBackgroundColor: '#8C96FF',
      pointRadius: 5,
      borderWidth: 0,
    },
  ],
}

const options = {
  responsive: true,
  scales: {
    r: {
      angleLines: {
        display: true,
        color: 'rgba(255,255,255,.08)',
      },
      ticks: {
        display: false,
      },
      grid: {
        color: '#FFFFFF0A',
        circular: true,
      },
      suggestedMin: 0,
      suggestedMax: 0.8,
      pointLabels: {
        font: {
          size: 14,
        },
        color: '#FFFFFF99',
        padding: 15,
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      display: false,
    },
  },
  onClick: (e: MouseEvent) => {
    if (radarChart.value) {
      const chart = radarChart.value?.chart
      const points = chart.getElementsAtEventForMode(e, 'index', { intersect: false }, false)
      if (points.length) {
        const pointIndex = points[0].index
        selectedItem.value.label = data.labels[pointIndex]
        selectedItem.value.value = data.datasets[0].data[pointIndex]
      }
    }
  },
}
</script>

<style scoped>
.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.radar_chart_container {
  display: table;
  margin: -75px auto 0;
}
.graph {
  width: 450px !important;
  height: 450px !important;
}

@media (max-width: 1200px) {
  .graph {
    width: 300px !important;
    height: 300px !important;
  }
  .radar_chart_container {
    margin: 0 auto;
  }
}
@media (max-width: 991px) {
  .graph {
    width: 450px !important;
    height: 450px !important;
  }
  .radar_chart_container {
    margin: -75px auto 0;
  }
}
</style>
