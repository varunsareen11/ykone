<script lang="ts" setup>
import InfoIcon from './icons/InfoIcon.vue'
import ContentScannerSearch from './icons/ContentScannerSearch.vue'
</script>
<template>
  <section>
    <h2 class="titleM">CONTENT SCANNER</h2>
    <div class="scanner_search">
      <input type="text" placeholder="Type anything to search..." class="bodyL" />
      <button><ContentScannerSearch /></button>
    </div>
    <div class="popular_search">
      <span class="bodyM">Popular searches:</span>
      <ul>
        <li class="bodyM">Fashion <InfoIcon class="icon" /></li>
        <li class="bodyM">Beauty <InfoIcon class="icon" /></li>
        <li class="bodyM">Luxury <InfoIcon class="icon" /></li>
        <li class="bodyM">Travel <InfoIcon class="icon" /></li>
      </ul>
    </div>
  </section>
</template>
<style scoped>
section {
  padding: 2.5rem 1.5rem 0;
  border-top: 1px solid #ffffff1a;
  border-bottom: 1px solid #ffffff1a;
  margin: 2.5rem 0;
}
section h2 {
  text-transform: uppercase;
  margin-bottom: 90px;
}
.scanner_search,
.popular_search {
  position: relative;
  max-width: 932px;
  margin: 0 auto;
}
.scanner_search {
  margin-bottom: 1.5rem;
}
.scanner_search input {
  width: 100%;
  height: 56px;
  border-radius: 8px;
  padding: 1rem 1rem 1rem 56px;
  background: #3d3f54;
  border: none;
  outline: none;
  color: var(--white-color);
}
.scanner_search button {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  border: none;
  outline: none;
  background-color: transparent;
}
.popular_search {
  display: flex;
  align-items: center;
  margin-bottom: 90px;
}
.popular_search span {
  color: var(--white-color);
}
.popular_search ul {
  display: flex;
  align-items: center;
}
.popular_search ul li {
  display: inline-flex;
  align-items: center;
  background: #2c2f4b;
  border-radius: 8px;
  box-shadow: 0px 5px 30px 0px #ffffff0d inset;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  padding: 0 0.5rem;
  margin-left: 0.5rem;
}
.popular_search ul li .icon {
  margin-left: 0.25rem;
}
.popular_search ul li::before {
  content: '';
  inset: 0;
  position: absolute;
  background-color: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0) 100%
  );
}
@media (max-width: 767px) {
  section h2 {
    margin-bottom: 3rem;
  }
  .scanner_search input {
    height: 50px;
    padding: 0.5rem 0.5rem 0.5rem 56px;
  }
  .popular_search {
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }
}
</style>
