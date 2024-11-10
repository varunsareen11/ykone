<script setup lang="ts">
import { defineProps } from 'vue'
import { RouterLink } from 'vue-router'
import DashboardIcon from '../icons/DashboardIcon.vue'
import ProfileIcon from '../icons/ProfileIcon.vue'
import ListIcon from '../icons/ListIcon.vue'
import MonitorIcon from '../icons/MonitorIcon.vue'
import KeywordIcon from '../icons/KeywordIcon.vue'
import LeaderBoardIcon from '../icons/LeaderBoardIcon.vue'
import SettingIcon from '../icons/SettingIcon.vue'

const props = defineProps<{
  mobileMenu: boolean
}>()
</script>

<template>
  <div class="sidebar" :class="{ mobileActive: props.mobileMenu }">
    <div class="logo_box">
      <RouterLink class="logo" to="/"><img src="@/assets/images/Logo.svg" alt="Logo" /></RouterLink>
    </div>
    <nav>
      <RouterLink class="nav_list" to="/"><DashboardIcon /></RouterLink>
      <RouterLink class="nav_list" to="/profile"><ProfileIcon /></RouterLink>
      <RouterLink class="nav_list" to="/list"><ListIcon /></RouterLink>
      <RouterLink class="nav_list" to="/monitor"><MonitorIcon /></RouterLink>
      <RouterLink class="nav_list" to="/keyword"><KeywordIcon /></RouterLink>
      <RouterLink class="nav_list" to="/leader-board"><LeaderBoardIcon /></RouterLink>
      <RouterLink class="nav_list" to="/setting"><SettingIcon /></RouterLink>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  padding: 16px 24px;
  border-right: 1px solid var(--secondary-color);
  flex: 0 0 88px;
}
nav {
  margin-top: 60px;
}
nav .nav_list,
.logo {
  display: block;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
nav .nav_list.router-link-active::before {
  content: '';
  inset: 0;
  position: absolute;
  background-color: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
nav .nav_list.router-link-active {
  box-shadow: 0px 0px 10px 0px #ffffff40 inset;
  background: #ffffff0d;

  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: var(--primary-color);
    width: 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
  }
  .mobileActive.sidebar {
    width: auto;
    opacity: 1;
    visibility: visible;
    transition: 0.3s;
  }
}
</style>
