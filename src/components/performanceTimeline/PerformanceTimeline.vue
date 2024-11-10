<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// import PerformanceGraph from './component/PerformanceGraph.vue'
import FollowerPerformanceGraph from './component/FollowerPerformanceGraph.vue'
import InteractionPerformanceGraph from './component/InteractionPerformanceGraph.vue'

export interface singleInteractionPerformance {
  date: string
  no_of_post: number
  interactions: {
    value: number
    type: string
  }
}

export interface singleFollowerPerformance {
  date: string
  no_of_post: number
  followers: {
    value: number
    type: string
  }
}

export interface IPerformanceTimeLine {
  interactions: singleInteractionPerformance[]
  followers: singleFollowerPerformance[]
}

const performanceTimeline = ref<IPerformanceTimeLine>()

onMounted(() => {
  const apiUrl = import.meta.env.VITE_PERFORMANCE_TIMELINE_API_URL
  if (apiUrl) {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        performanceTimeline.value = json
      })
      .catch((err) => console.log(err))
  } else {
    console.error('API URL is not defined in environment variables')
  }
})
</script>
<template>
  <section>
    <h2 class="titleM">PERFORMANCE TIMELINE</h2>
    <div class="performance_graph" v-if="performanceTimeline">
      <FollowerPerformanceGraph :followersData="performanceTimeline.followers" />
      <InteractionPerformanceGraph :interactionsData="performanceTimeline.interactions" />
    </div>
  </section>
</template>
<style scoped>
section {
  padding: 0 1.5rem 2.5rem;
}
section h2 {
  text-transform: uppercase;
  margin-bottom: 90px;
}
.performance_graph {
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
