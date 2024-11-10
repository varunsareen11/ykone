<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits } from 'vue'
import InstagramIcon from '../icons/InstagramIcon.vue'
import InstagramReelIcon from '../icons/InstagramReelIcon.vue'
import InstagramStoryIcon from '../icons/InstagramStoryIcon.vue'
import YoutubeIcon from '../icons/YoutubeIcon.vue'

const currency = [
  { value: 'euro', text: 'Euro' },
  { value: 'dollar', text: 'Dollar' },
]

const props = defineProps<{
  mobileMenu: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleMobileMenu'): void
}>()

const toggleMobileMenu = () => {
  emit('toggleMobileMenu')
}

const selectedFruit = ref('')

onMounted(() => {
  selectedFruit.value = currency[0].value // Select the first item by default
})
</script>

<template>
  <header :class="{ mobileActive: props.mobileMenu }">
    <ul class="breadcrumb">
      <li class="titleM">Profile <span>></span></li>
      <li class="titleM">LISA <span>></span></li>
      <li class="titleM"><InstagramIcon /></li>
      <li class="titleM"><InstagramReelIcon /></li>
      <li class="titleM"><InstagramStoryIcon /></li>
      <li class="titleM"><YoutubeIcon /></li>
    </ul>
    <div class="dropdown_container">
      <label for="currency-dropdown" class="bodyM">CURRENCY - </label>
      <select id="currency-dropdown" v-model="selectedFruit" class="bodyM">
        <option v-for="(fruit, index) in currency" :key="index" :value="fruit.value">
          {{ fruit.text }}
        </option>
      </select>
    </div>
    <button class="mobile_btn" @click="toggleMobileMenu">
      <img src="@/assets/images/menu.png" alt="menu button" />
    </button>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid var(--secondary-color);
}

button.mobile_btn img {
  width: 20px;
}

button.mobile_btn {
  background: white;
  border: none;
  padding: 6px;
  border-radius: 4px;
  display: none;
}

header .breadcrumb {
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding-right: 20px;
}
header .breadcrumb li {
  display: flex;
  align-items: center;
  padding-right: 1.5rem;
  text-transform: uppercase;
}
header .breadcrumb li span {
  margin-left: 1.5rem;
}
header .dropdown_container {
  color: var(--white-light);
}
header .dropdown_container select {
  color: var(--white-light);
  background-color: transparent;
  border: none;
  outline: none;
  text-transform: uppercase;
}

@media (max-width: 767px) {
  button.mobile_btn {
    display: block;
    margin-left: 20px;
  }
  header .breadcrumb li {
    padding-right: 1rem;
  }
  header .breadcrumb li span {
    margin-left: 1rem;
  }
  .dropdown_container label {
    display: none;
  }
}
</style>
