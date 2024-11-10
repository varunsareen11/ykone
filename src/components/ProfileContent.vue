<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import type { IPostData } from '@/typeInterfaces/TypeInterface'
import { useCalculation } from '@/composables/CaculationHook'

const { dateFormat, formatToShortScale, convertToPercentage, convertToCurrency } = useCalculation()

const lists = ref<IPostData[]>([])

const sortCriterion = ref('DATE')

const setSortCriterion = (criterion: string) => {
  sortCriterion.value = criterion
}

const sortedList = computed(() => {
  return [...lists.value].sort((a, b) => {
    switch (sortCriterion.value) {
      case 'DATE':
        return b.created_at - a.created_at
      case 'REACH':
        return b.reach.value - a.reach.value
      case 'IMPRESSIONS':
        return b.impressions.value - a.impressions.value
      case 'ENGAGEMENT':
        return b.engagement_rate.value - a.engagement_rate.value
      case 'INTERACTIONS':
        return b.interactions.value - a.interactions.value
      case 'EMV':
        return b.media_value.value - a.media_value.value
      default:
        return 0
    }
  })
})

onMounted(() => {
  const apiUrl = import.meta.env.VITE_PROFILE_CONTENT_API_URL
  if (apiUrl) {
    console.log('apiUrl', apiUrl)
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        lists.value = json
      })
      .catch((err) => console.log(err))
  } else {
    console.error('API URL is not defined in environment variables')
  }
})
</script>
<template>
  <section>
    <div class="sec_head">
      <h2 class="titleM">CONTENT</h2>
      <ul>
        <li class="bodyM">
          <button @click="setSortCriterion('DATE')" :class="{ active: sortCriterion === 'DATE' }">
            DATE
          </button>
        </li>
        <li class="bodyM">
          <button @click="setSortCriterion('REACH')" :class="{ active: sortCriterion === 'REACH' }">
            REACH
          </button>
        </li>
        <li class="bodyM">
          <button
            @click="setSortCriterion('IMPRESSIONS')"
            :class="{ active: sortCriterion === 'IMPRESSIONS' }"
          >
            IMPRESSIONS
          </button>
        </li>
        <li class="bodyM">
          <button
            @click="setSortCriterion('ENGAGEMENT')"
            :class="{ active: sortCriterion === 'ENGAGEMENT' }"
          >
            ENGAGEMENT
          </button>
        </li>
        <li class="bodyM">
          <button
            @click="setSortCriterion('INTERACTIONS')"
            :class="{ active: sortCriterion === 'INTERACTIONS' }"
          >
            INTERACTIONS
          </button>
        </li>
        <li class="bodyM">
          <button @click="setSortCriterion('EMV')" :class="{ active: sortCriterion === 'EMV' }">
            EMV
          </button>
        </li>
      </ul>
    </div>
    <div class="box" v-if="lists.length > 0">
      <div
        v-for="(item, index) in sortedList"
        :key="item.id"
        :class="['box_item', { larger: (index + 1) % 7 === 0 || index === 0 }]"
      >
        <figure>
          <img :src="item.image" :alt="item.id" />
        </figure>
        <span class="index_tag bodyM">{{ index + 1 }}</span>
        <ul class="content">
          <li class="bodyS">
            <span>{{ dateFormat(item.created_at) }}</span>
          </li>
          <li class="bodyS">
            <span>Reach:</span><span>{{ formatToShortScale(item.reach.value) }}</span>
          </li>
          <li class="bodyS">
            <span>Impressions:</span><span>{{ formatToShortScale(item.impressions.value) }}</span>
          </li>
          <li class="bodyS">
            <span>Engagement Rate:</span
            ><span>{{ convertToPercentage(item.engagement_rate.value) }}</span>
          </li>
          <li class="bodyS">
            <span>Likes:</span><span>{{ formatToShortScale(item.likes_count.value) }}</span>
          </li>
          <li class="bodyS">
            <span>Comments:</span><span>{{ formatToShortScale(item.comments_count.value) }}</span>
          </li>
          <li class="bodyS">
            <span>Influencer EMV:</span><span>{{ convertToCurrency(item.media_value.value) }}</span>
          </li>
        </ul>
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
  margin-bottom: 2.5rem;
}
.sec_head {
  display: flex;
  align-items: center;
}
.sec_head h2 {
  text-transform: uppercase;
}
.sec_head ul {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}
.sec_head ul li {
  padding: 0 0.75rem;
}
.sec_head ul li button {
  border: none;
  outline: none;
  background-color: transparent;
  color: var(--white-light);
  transition: 0.3s;
  cursor: pointer;
}
.sec_head ul li button:hover,
.sec_head ul li button.active {
  color: var(--white-color);
  transition: 0.3s;
}

.box {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 200px;
  gap: 1rem;
  margin-top: 2rem;
}
.box_item {
  position: relative;
  cursor: pointer;
}
.box_item .index_tag {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #303349;
}
.box_item figure img,
.box_item figure {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.box_item.larger {
  grid-column: span 2;
  grid-row: span 2;
}
.box_item .content {
  background: #282b41e5;
  position: absolute;
  inset: 0;
  padding: 1rem;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}
.box_item:hover .content {
  opacity: 1;
  visibility: visible;
  transition: 0.3s;
}
.box_item .content li {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.box_item .content li:not(:last-child) {
  margin-bottom: 10px;
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
@media (max-width: 1200px) {
  .box {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 600px) {
  section {
    padding: 1.25rem;
  }
  .sec_head {
    display: block;
  }
  .sec_head h2 {
    margin-bottom: 20px;
  }
  .box {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
