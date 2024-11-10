<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import HeaderView from './components/shared/HeaderView.vue'
import SidebarView from './components/shared/SidebarView.vue'

const mobileMenuBar = ref<boolean>(false)

const toggleMobileMenu = () => {
  mobileMenuBar.value = !mobileMenuBar.value
}
</script>

<template>
  <div class="wrapper">
    <SidebarView :mobileMenu="mobileMenuBar" />
    <main>
      <HeaderView :mobileMenu="mobileMenuBar" @toggleMobileMenu="toggleMobileMenu" />
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
}
.wrapper main {
  flex-grow: 1;
}
</style>
