<template>
  <div v-if="profileData" class="profile_data">
    <figure>
      <div v-if="isLoading">Loading...</div>
      <img :src="profileData.profile_display_picture" :alt="profileData.profile_name" />
    </figure>
    <div class="column1">
      <div class="box">
        <div v-if="isLoading">Loading...</div>
        <UserDetail v-else :data="profileData" />
      </div>
      <div class="box">
        <div v-if="isLoading">Loading...</div>
        <QualityScore title="QUALITY SCORE" :qualitydata="profileData.profile_quality" />
      </div>
    </div>
    <div class="column2">
      <div class="box">
        <div v-if="isLoading">Loading...</div>
        <StatsDetail title="ENGAGEMENT RATE" :data="profileData.profile_engagement_rate" />
      </div>
      <div class="box">
        <div v-if="isLoading">Loading...</div>
        <StatsDetail title="ACTIVE FOLLOWERS" :data="profileData.profile_active_followers" />
      </div>
      <div class="box">
        <div v-if="isLoading">Loading...</div>
        <StatsDetail title="EMV" :data="profileData.profile_media_value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { type IProfileData } from '@/typeInterfaces/TypeInterface'
import UserDetail from './component/UserDetail.vue'
import StatsDetail from './component/StatsDetail.vue'
import QualityScore from './component/QualityScore.vue'

const profileData = ref<IProfileData>()
const isLoading = ref<boolean>(false)

onMounted(() => {
  isLoading.value = true
  const apiUrl = import.meta.env.VITE_PROFILE_DATA_API_URL
  if (apiUrl) {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        profileData.value = json
        isLoading.value = false
      })
      .catch((error) => console.error('Fetch error:', error))
  } else {
    console.error('API URL is not defined in environment variables')
  }
})
</script>

<style scoped>
.profile_data {
  display: flex;
  min-height: 640px;
  margin: 3rem 0 2.5rem;
  justify-content: space-between;
}
.profile_data figure {
  flex: 0 0 calc(40% - 5.3px);
}
.profile_data figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}
.profile_data .box {
  background: #ffffff05;
  padding: 2rem;
  border: 1px solid #ffffff0a;
}
.profile_data .column1 {
  flex: 0 0 calc(40% - 5.3px);
}
.profile_data .column2 {
  flex: 0 0 calc(20% - 5.3px);
}
.profile_data .column1 .box {
  height: calc(50% - 4px);
}
.profile_data .column2 .box {
  height: calc(33.3% - 5.3px);
}
.profile_data .column1 .box:not(:last-child),
.profile_data .column2 .box:not(:last-child) {
  margin-bottom: 8px;
}
@media (max-width: 1024px) {
  .profile_data {
    flex-wrap: wrap;
  }
  .profile_data figure {
    flex: 0 0 100%;
    height: 300px;
    margin-bottom: 8px;
  }
  .profile_data .column1 {
    flex: 0 0 calc(70% - 5.3px);
  }
  .profile_data .column2 {
    flex: 0 0 calc(30% - 5.3px);
  }
}
@media (max-width: 767px) {
  .profile_data {
    display: flex;
    min-height: 640px;
    margin: 30px 0 2.5rem;
  }
  .profile_data .column1 {
    margin-bottom: 8px;
    flex: 0 0 100%;
  }
  .profile_data .column2 {
    flex: 0 0 100%;
    display: flex;
  }
  .profile_data .column1 .box,
  .profile_data .column2 .box {
    height: auto;
  }
  .profile_data .column2 .box {
    flex: 0 0 33.3%;
  }
  .profile_data .column2 .box:not(:last-child) {
    margin-bottom: 0;
  }
}
@media (max-width: 575px) {
  .profile_data .box {
    padding: 1.25rem;
  }
}
</style>
