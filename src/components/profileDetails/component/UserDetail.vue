<template>
  <div class="about_name">
    <div class="name">
      <h4 class="titleM">
        {{ props.data.profile_name }}
        <span v-if="props.data.profile_verified"><VerifiedIcon /></span>
      </h4>
      <p class="bodyM">@{{ props.data.profile_username }}</p>
    </div>
    <div class="follower">
      <h4 class="titleM">
        <DirectionIcon color="#64FFAA" />{{
          formatToShortScale(props.data.profile_followers.value)
        }}
      </h4>
      <p class="bodyM">Followers</p>
    </div>
  </div>
  <ul class="info_list">
    <li class="bodyM">
      <FlagIcon /> <span> {{ props.data.profile_type }}</span>
    </li>
    <li class="bodyM">
      <LocationIcon /> <span>{{ props.data.profile_country.name }}</span>
    </li>
    <li class="bodyM">
      <CategoryIcon />
      <span v-for="(item, index) in props.data.profile_theme" :key="index">{{ item }}</span>
    </li>
    <li class="bodyM">
      <UserIcon /> <span>{{ props.data.profile_gender }} Female</span>
    </li>
    <li class="bodyM">
      <TagIcon />
      <span v-for="(item, index) in props.data.profile_keyword" :key="index">{{ item }}</span>
    </li>
  </ul>
  <div class="about_social">
    <ul>
      <li v-if="props.data.profile_accounts.instagram"><InstagramIcon /></li>
      <li v-if="props.data.profile_accounts.youtube"><YoutubeIcon /></li>
      <li v-if="props.data.profile_accounts.email"><EmailIcon /></li>
    </ul>
    <span class="bodyM">Added on {{ dateFormat(props.data.profile_created_at) }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useCalculation } from '@/composables/CaculationHook'
import { type IProfileData } from '@/typeInterfaces/TypeInterface'
import VerifiedIcon from '@/components/icons/VerifiedIcon.vue'
import DirectionIcon from '@/components/icons/DirectionIcon.vue'
import FlagIcon from '@/components/icons/FlagIcon.vue'
import CategoryIcon from '@/components/icons/CategoryIcon.vue'
import LocationIcon from '@/components/icons/LocationIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import TagIcon from '@/components/icons/TagIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import YoutubeIcon from '@/components/icons/YoutubeIcon.vue'
import EmailIcon from '@/components/icons/EmailIcon.vue'

const { formatToShortScale, dateFormat } = useCalculation()

const props = defineProps<{
  data: IProfileData
}>()
</script>

<style scoped>
.profile_data .box .about_name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #36394e;
  padding-bottom: 1rem;
}
.profile_data .box .about_name .follower {
  text-align: right;
}
.profile_data .box .about_name h4 {
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.profile_data .box .about_name p {
  color: var(--white-light);
}
.profile_data .box .info_list {
  display: flex;
  flex-wrap: wrap;
}
.profile_data .box .info_list li {
  flex: 0 0 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-transform: capitalize;
  margin-top: 1rem;
}
.profile_data .box .info_list li:nth-child(even) {
  justify-content: right;
}
.profile_data .box .info_list li span {
  margin: 0 5px;
}
.profile_data .box .info_list li span:not(:last-child)::after {
  content: ',';
}
.profile_data .box .about_social {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}
.profile_data .box .about_social ul {
  display: flex;
  align-items: center;
}
.profile_data .box .about_social ul li {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: #2c2f4b;
  border: 1px solid #36394e;
  border-radius: 0.5rem;
  margin-right: 1rem;
  position: relative;
  overflow: hidden;
}
.profile_data .box .about_social ul li::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
}
.profile_data .box .about_social span {
  color: var(--white-light);
}
</style>
