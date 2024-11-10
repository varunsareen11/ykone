<template>
  <div class="quality_wrapper">
    <div class="content">
      <h5 class="stats_heading titleXS">{{ props.title }}</h5>
      <div :class="getDirectionClass">
        <span>
          <DirectionIcon
            :color="getDirectionColor"
            v-if="props.qualitydata.score.direction !== 'negative'"
          />
          <DirectionDownIcon :color="getDirectionColor" v-else />
        </span>
        <h3>
          <span class="titleXL">{{ props.qualitydata.score.value }}</span
          ><span class="titleXS">/100</span>
        </h3>
        <p class="bodyM">{{ getBelowContent }}</p>
      </div>
    </div>
    <Radar :data="radarChartData" :options="options" class="graph" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { IProfileQuality } from '@/typeInterfaces/TypeInterface'
import DirectionIcon from '@/components/icons/DirectionIcon.vue'
import DirectionDownIcon from '@/components/icons/DirectionDownIcon.vue'
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

// Register chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps<{
  title: string
  qualitydata: IProfileQuality
}>()

const getDirectionClass = computed(() => {
  return {
    neutral: props.qualitydata.score.direction === 'neutral',
    positive: props.qualitydata.score.direction === 'positive',
    negative: props.qualitydata.score.direction === 'negative',
  }
})
const getBelowContent = computed(() => {
  if (props.qualitydata.score.direction === 'neutral') {
    return 'Average'
  } else if (props.qualitydata.score.direction === 'positive') {
    return 'Excellent'
  } else if (props.qualitydata.score.direction === 'negative') {
    return 'Bad'
  }
  return 'Average'
})
const getDirectionColor = computed(() => {
  if (props.qualitydata.score.direction === 'neutral') {
    return '#ffc164' // neutral color
  } else if (props.qualitydata.score.direction === 'positive') {
    return '#64ffaa' // positive color
  } else if (props.qualitydata.score.direction === 'negative') {
    return '#ff6464' // negative color
  }
  return '#000000' // default color in case of any other value
})

const radarChartData = computed(() => ({
  labels: ['Growth', 'Interaction', 'Impression', 'Reach', 'Media Value'],
  datasets: [
    {
      label: 'Quality Scores',
      data: [
        props.qualitydata.score_metrics.growth,
        props.qualitydata.score_metrics.interaction,
        props.qualitydata.score_metrics.impression,
        props.qualitydata.score_metrics.reach,
        props.qualitydata.score_metrics.media_value,
      ],
      fill: true,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderColor: 'rgb(255, 255, 255)',
      pointBackgroundColor: 'rgb(255, 255, 255)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)',
    },
  ],
}))

const options = {
  responsive: true,
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      ticks: {
        display: false, // Hide the scale ticks
      },
      grid: {
        color: 'rgba(200, 200, 200, 0.3)',
        circular: true,
        backgroundColor: '#000',
      },
      suggestedMin: 0,
      suggestedMax: 0,
      pointLabels: {
        display: false, // Hide point labels on the chart
      },
    },
  },
  plugins: {
    tooltip: {
      enabled: true, // Enable tooltips on hover
    },
    legend: {
      display: false,
    },
  },
}
</script>
<style scoped>
.quality_wrapper {
  display: flex;
  justify-content: space-between;
}
.quality_wrapper .content {
  flex: 0 0 40%;
}
.quality_wrapper .graph {
  flex: 0 0 180px;
  width: 180px !important;
  height: auto !important;
}
.stats_heading {
  margin-bottom: 40px;
}
.positive {
  color: #64ffaa;
}
.neutral {
  color: #ffc164;
}
.negative {
  color: #ff6464;
}
</style>
