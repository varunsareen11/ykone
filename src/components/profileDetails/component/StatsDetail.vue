<template>
  <h5 class="stats_heading titleXS">{{ props.title }}</h5>
  <div :class="getDirectionClass">
    <span>
      <DirectionIcon :color="getDirectionColor" v-if="props.data.direction !== 'negative'" />
      <DirectionDownIcon :color="getDirectionColor" v-else />
    </span>
    <h3 class="titleL" v-if="props.data.type === 'percentage'">
      {{ convertToPercentage(props.data.value) }}
    </h3>
    <h3 class="titleL" v-if="props.data.type === 'currency'">
      {{ convertToCurrency(props.data.value) }}
    </h3>
    <p class="bodyM">{{ getBelowContent }}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { type IProfileEngageMent } from '@/typeInterfaces/TypeInterface'
import DirectionIcon from '@/components/icons/DirectionIcon.vue'
import DirectionDownIcon from '@/components/icons/DirectionDownIcon.vue'
import { useCalculation } from '@/composables/CaculationHook'

const props = defineProps<{
  title: string
  data: IProfileEngageMent
}>()

const { convertToPercentage, convertToCurrency } = useCalculation()

const getDirectionClass = computed(() => {
  return {
    neutral: props.data.direction === 'neutral',
    positive: props.data.direction === 'positive',
    negative: props.data.direction === 'negative',
  }
})
const getBelowContent = computed(() => {
  if (props.data.direction === 'neutral') {
    return 'Average'
  } else if (props.data.direction === 'positive') {
    return 'Excellent'
  } else if (props.data.direction === 'negative') {
    return 'Bad'
  }
  return 'Average'
})
const getDirectionColor = computed(() => {
  if (props.data.direction === 'neutral') {
    return '#ffc164' // neutral color
  } else if (props.data.direction === 'positive') {
    return '#64ffaa' // positive color
  } else if (props.data.direction === 'negative') {
    return '#ff6464' // negative color
  }
  return '#000000' // default color in case of any other value
})
</script>
<style scoped>
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
