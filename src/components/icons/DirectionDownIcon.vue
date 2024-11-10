<template>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 8.25L7.75 13.5L13 8.25M7.75 3L7.75 12.75"
      :stroke="props.color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps<{
  color: string
}>()
</script>
