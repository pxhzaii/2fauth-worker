<template>
  <div class="layout-main">
    <TheHeader />
    <main class="layout-main-content">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheHeader from '@/shared/components/theHeader.vue'
import TheFooter from '@/shared/components/theFooter.vue'
import { RouterView } from 'vue-router'
</script>


