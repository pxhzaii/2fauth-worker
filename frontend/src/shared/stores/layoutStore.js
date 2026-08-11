import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const isMobile = ref(false)
  const showMobileMenu = ref(false)
  const homeTabReset = ref(0) // 触发返回统一的主账号视图

  // 网络状态监控
  const isOffline = ref(!navigator.onLine)

  const initNetworkStatus = () => {
    window.addEventListener('online', () => { isOffline.value = false })
    window.addEventListener('offline', () => { isOffline.value = true })
  }

  return {
    isMobile,
    showMobileMenu,
    homeTabReset,
    isOffline,
    initNetworkStatus
  }
})