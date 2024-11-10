<template>
  <div class="bar_chart">
    <Bar :data="chartData" :options="chartOptions" class="graph" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  PointElement,
  LinearScale,
} from 'chart.js'
import type { singleInteractionPerformance } from '../PerformanceTimeline.vue'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, Title, Tooltip, Legend)

const props = defineProps<{
  interactionsData: singleInteractionPerformance[]
}>()

const groupByMonth = (data: singleInteractionPerformance[]) => {
  const result: { [key: string]: { totalInteractions: number; count: number } } = {}

  data.forEach((item) => {
    const date = new Date(item.date)
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' })

    if (!result[month]) {
      result[month] = { totalInteractions: 0, count: 0 }
    }

    result[month].totalInteractions += item.interactions.value
    result[month].count += 1
  })

  const months = Object.keys(result)
  const interactions = months.map((month) => result[month].totalInteractions)

  return { months, interactions }
}

const { months, interactions } = groupByMonth(props.interactionsData)

const chartData = ref({
  labels: months,
  datasets: [
    {
      label: 'Interactions',
      data: interactions,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      hoverBackgroundColor: '#64FFAA',
      barThickness: 10,
      borderWidth: 0,
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
      enabled: false,
      external: function (context: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tooltip: any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        chart: { canvas: { getBoundingClientRect: () => any } }
      }) {
        let tooltipEl = document.getElementById('chartjs-tooltip')
        if (!tooltipEl) {
          tooltipEl = document.createElement('div')
          tooltipEl.id = 'chartjs-tooltip'
          tooltipEl.innerHTML = '<table></table>'
          document.body.appendChild(tooltipEl)
        }
        const tooltipModel = context.tooltip
        if (tooltipModel.opacity === 0) {
          tooltipEl.style.opacity = 0
          return
        }

        tooltipEl.classList.remove('above', 'below', 'no-transform')
        if (tooltipModel.yAlign) {
          tooltipEl.classList.add(tooltipModel.yAlign)
        } else {
          tooltipEl.classList.add('no-transform')
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function getBody(bodyItem: { lines: any }) {
          return bodyItem.lines
        }

        if (tooltipModel.body) {
          const titleLines = tooltipModel.title || []
          const bodyLines = tooltipModel.body.map(getBody)

          let innerHtml = '<thead>'

          titleLines.forEach(function (title: string) {
            innerHtml += '<tr><th>' + title + '</th></tr>'
          })
          innerHtml += '</thead><tbody>'

          bodyLines.forEach(function (body: string, i: string | number) {
            const colors = tooltipModel.labelColors[i]
            let style = 'background:' + colors.backgroundColor
            style += '; border-color:' + colors.borderColor
            style += '; border-width: 2px'
            const span = '<span style="' + style + '">' + body + '</span>'
            innerHtml += '<tr><td>' + span + '</td></tr>'
          })
          innerHtml += '</tbody>'

          const tableRoot = tooltipEl.querySelector('table')
          tableRoot.innerHTML = `
            <div style="text-align: center; background: #282B4129; border: 1px solid #FFFFFF0A; backdrop-filter: blur(32px); padding: 10px">
              <p style="font-size: 20px; color: white;">${bodyLines[0][0].split(':')[1]}</p>
              <p style="font-size: 12px; color: rgba(255, 255, 255, 0.5);">Interactions on ${tooltipModel.title}</p>
              </div>
            `
        }

        const position = context.chart.canvas.getBoundingClientRect()

        tooltipEl.style.opacity = 1
        tooltipEl.style.position = 'absolute'
        tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
        tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px'
        tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'
        tooltipEl.style.pointerEvents = 'none'
      },
    },
  },
  scales: {
    y: {
      display: false,
    },
    x: {
      // display: false,
      grid: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
})
</script>
<style scoped>
.bar_chart {
  margin-top: -500px;
  margin-bottom: -29px;
}
</style>
