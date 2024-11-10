<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import GenderDistribution from './component/GenderDistribution.vue'
import AgeDistribution from './component/AgeDistribution.vue'
import CountryDistribution from './component/CountryDistribution.vue'
import EthnicityDistribution from './component/EthnicityDistribution.vue'

const audienceDemographicsData = ref()

onMounted(() => {
  const apiUrl = import.meta.env.VITE_AUDIENCE_DEMOGRAPHICS_URL
  if (apiUrl) {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        audienceDemographicsData.value = json
      })
      .catch((err) => console.log(err))
  } else {
    console.error('API URL is not defined in environment variables')
  }
})
</script>
<template>
  <section>
    <h2 class="titleM">AUDIENCE DEMOGRAPHICS</h2>
    <div class="box" v-if="audienceDemographicsData">
      <div class="box_item">
        <GenderDistribution :genderData="audienceDemographicsData.genders" />
      </div>
      <div class="box_item">
        <AgeDistribution :ageData="audienceDemographicsData.ages" />
      </div>
      <div class="box_item">
        <CountryDistribution :countryData="audienceDemographicsData.countries" />
      </div>
      <div class="box_item">
        <EthnicityDistribution :ethnicityData="audienceDemographicsData.ethnicities" />
      </div>
    </div>
    <div class="bottom_btn">
      <button class="titleXS">LOAD MORE</button>
    </div>
  </section>
</template>
<style scoped>
section {
  padding: 2rem;
  background: #ffffff05;
  border: 1px solid #ffffff0a;
}
section h2 {
  text-transform: uppercase;
  margin-bottom: 32px;
}
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.box_item {
  flex: 0 0 calc(50% - 4px);
  background: #ffffff05;
  border: 1px solid #ffffff0a;
  padding: 2rem;
  margin-bottom: 8px;
  height: 380px;
  overflow: hidden;
}
.bottom_btn {
  display: table;
  margin: 0 auto;
  margin-top: 2rem;
}
.bottom_btn button {
  background: #ffffff0d;
  box-shadow: 0px 0px 10px 0px #ffffff40 inset;
  text-transform: uppercase;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  color: var(--white-color);
  position: relative;
  border: none;
  overflow: hidden;
  cursor: pointer;
}
.bottom_btn button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  padding: 1px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%);
}

@media (max-width: 991px) {
  .box {
    display: block;
  }
}
</style>
