<template>
  <div class="add-vault-wrapper">
    <div class="tab-card-wrapper">
      <h2 class="text-center mb-20">📷 {{ $t('vault.scan_qr') }}</h2>
      <div class="max-w-600 m-auto">
        <div class="text-center mb-20 mt-10">
          <p class="text-secondary">{{ $t('vault.scan_camera_tip') }}</p>
        </div>
        <QrScanner @scan-success="handleScanSuccess" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { h, defineAsyncComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { parseOtpUri } from '@/shared/utils/totp'
import { useVaultStore } from '@/features/vault/store/vaultStore'
import { vaultService } from '@/features/vault/service/vaultService'
import { i18n } from '@/locales'

const QrScanner = defineAsyncComponent(() => import('@/shared/components/qrScanner.vue'))

const emit = defineEmits(['success'])
const vaultStore = useVaultStore()
const { t } = i18n.global

const handleScanSuccess = async (uri) => {
  try {
    const acc = parseOtpUri(uri)
    if (!acc) {
      ElMessage.error(t('vault.invalid_qr_format'))
      return
    }

    await ElMessageBox.confirm(
      h('div', { class: 'confirmation-box' }, [
        h('div', { class: 'confirmation-row' }, [
           h('span', { class: 'confirmation-label' }, t('vault.service_label')),
           h('span', { class: 'confirmation-value' }, acc.service || t('vault.unknown_service'))
        ]),
        h('div', { class: 'confirmation-row' }, [
           h('span', { class: 'confirmation-label' }, t('vault.account_label')),
           h('span', { class: 'confirmation-value mono' }, acc.account || t('vault.unnamed_account'))
        ]),
        h('div', { class: 'confirmation-row' }, [
           h('span', { class: 'confirmation-label' }, t('vault.param_label')),
           h('div', { class: 'confirmation-tags' }, [
               h('span', { class: 'confirmation-tag confirmation-tag-info' }, acc.algorithm || 'SHA1'),
               h('span', { class: 'confirmation-tag confirmation-tag-success' }, `${acc.digits || 6}${t('vault.digits_suffix')}`),
               h('span', { class: 'confirmation-tag confirmation-tag-warning' }, `${acc.period || 30}${t('vault.period_suffix')}`)
           ])
        ])
      ]),
      t('vault.confirm_add_title'),
      {
        confirmButtonText: t('common.confirm'),
        cancelButtonText: t('common.cancel'),
        type: 'success',
        center: true
      }
    )

    const addData = await vaultService.addFromUri(uri, 'Scan')

    if (addData.success) {
      ElMessage.success(t('vault.add_success'))
      vaultStore.markDirty() // 实际写入数据，标记缓存过期
      emit('success')
    }
  } catch (err) {
    if (err !== 'cancel') console.error(err)
  }
}
</script>