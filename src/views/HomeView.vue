<script setup lang="ts">
import ProfileDetails from '@/components/profileDetails/ProfileDetails.vue'
import ProfileContent from '@/components/ProfileContent.vue'
import AudienceDemographics from '@/components/audienceDemographics/AudienceDemographics.vue'
import ContentScanner from '@/components/ContentScanner.vue'
import PerformanceTimeline from '@/components/performanceTimeline/PerformanceTimeline.vue'
</script>

<template>
  <div class="container">
    <ProfileDetails />
    <ProfileContent />
    <AudienceDemographics />
    <ContentScanner />
    <PerformanceTimeline />
  </div>
</template>
<style scoped>
.container {
  max-width: 1300px;
  padding: 0 50px;
  margin: 0 auto;
}
@media (max-width: 1024px) {
  .container {
    padding: 0 30px;
    overflow: hidden;
  }
}
</style>
