<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { Warning, Loading } from '@element-plus/icons-vue'
import MainLayout from '@/app/layouts/mainLayout.vue'
import BlankLayout from '@/app/layouts/blankLayout.vue'
import { useLayoutStore } from '@/shared/stores/layoutStore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

const { locale } = useI18n()
const elementLocale = computed(() => {
  return locale.value === 'zh-CN' ? zhCn : en
})

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()

const isAppLoading = ref(true)

const layoutComponent = computed(() => {
  if (route.meta.layout === 'blank' || !route.meta.requiresAuth) {
    return BlankLayout
  }
  return MainLayout
})

router.isReady().then(() => {
  // Give it a tiny delay to ensure DOM is fully painted with proper matched route and meta
  setTimeout(() => {
    isAppLoading.value = false
  }, 100)
})

// 移动端菜单打开时锁定背景滚动
watch(() => layoutStore.showMobileMenu, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const checkMobile = () => {
  layoutStore.isMobile = window.innerWidth < 768
}

const userClosedOfflineBanner = ref(false)
const showOfflineBanner = computed(() => layoutStore.isOffline && !userClosedOfflineBanner.value)

watch(() => layoutStore.isOffline, (offline) => {
  if (offline) {
    userClosedOfflineBanner.value = false
  }
})

onMounted(() => {
  checkMobile()
  layoutStore.initNetworkStatus()
  window.addEventListener('resize', checkMobile)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <!-- 全局初始加载白屏遮罩 (主要用于 /login 和 /health 等外部页面隐藏身份验证时的跳转闪烁) -->
    <div v-show="isAppLoading && route.path !== '/'" class="global-app-shell">
      <div class="shell-content">
        <el-icon class="is-loading shell-spinner" :size="48"><Loading /></el-icon>
      </div>
    </div>

    <!-- 主体应用 (等 Router 就绪后再挂载) -->
    <div class="app-container" v-show="!isAppLoading || route.path === '/'">
      <!-- 方案A: 全局离线横幅 -->
      <el-alert
        v-if="showOfflineBanner"
        :title="$t('common.offline_mode')"
        type="warning"
        show-icon
        center
        closable
        class="global-offline-banner"
        @close="userClosedOfflineBanner = true"
      />

    <!-- 加载动态路由 Layout (MainLayout 或 BlankLayout) -->
    <component :is="layoutComponent" />
    </div>
  </el-config-provider>
</template>

