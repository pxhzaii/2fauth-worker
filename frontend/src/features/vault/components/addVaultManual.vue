<template>
  <div class="add-vault-wrapper">
    <div class="tab-card-wrapper">
      <h2 class="text-center mb-20">{{ $t('vault.manual_title') }}</h2>
      <div class="m-auto w-full">
        <el-form :model="newVault" label-position="top" :rules="rules" ref="addFormRef" class="vault-manual-form-wrapper">
          <el-form-item :label="$t('common.service_name')" prop="service">
            <el-input v-model="newVault.service" :placeholder="$t('vault.input_service_placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('common.account_identifier')" prop="account">
            <el-input v-model="newVault.account" :placeholder="$t('vault.input_account_placeholder')" />
          </el-form-item>
          <el-form-item :label="$t('vault.input_secret_label')" prop="secret">
            <el-input v-model="newVault.secret" :placeholder="$t('vault.input_secret_placeholder')" clearable>
              <template #append>
                <el-button @click="generateRandomSecret" :title="$t('vault.generate_random_secret')"><el-icon><Refresh /></el-icon></el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="$t('vault.digits_label')" prop="digits">
                <el-select v-model="newVault.digits" class="w-full">
                  <el-option :label="$t('vault.digits_6')" :value="6" />
                  <el-option :label="$t('vault.digits_8')" :value="8" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('vault.period_label')" prop="period">
                <el-select v-model="newVault.period" class="w-full">
                  <el-option :label="$t('vault.period_30s')" :value="30" />
                  <el-option :label="$t('vault.period_60s')" :value="60" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('vault.algorithm_label')" prop="algorithm">
                <el-select v-model="newVault.algorithm" class="w-full">
                  <el-option :label="$t('vault.algo_sha1')" value="SHA1" />
                  <el-option label="SHA256" value="SHA256" />
                  <el-option label="SHA512" value="SHA512" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="$t('common.category_optional')" prop="category">
            <el-input v-model="newVault.category" :placeholder="$t('vault.input_category_placeholder')" />
          </el-form-item>
          <el-form-item class="mt-30">
            <el-button type="primary" :loading="submitting" @click="submitAddVault" class="vault-manual-submit-btn" size="large">{{ $t('vault.confirm_add_btn') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { bytesToBase32 } from '@/shared/utils/totp'
import { useVaultStore } from '@/features/vault/store/vaultStore'
import { vaultService } from '@/features/vault/service/vaultService'

const emit = defineEmits(['success'])

const { t } = useI18n()

const vaultStore = useVaultStore()
const submitting = ref(false)
const addFormRef = ref(null)
const newVault = ref({
  service: '', account: '', secret: '', category: '', digits: 6, period: 30, algorithm: 'SHA1'
})

const validateSecret = (rule, value, callback) => {
  if (!value) {
    return callback(new Error(t('vault.require_secret')))
  }
  // 移除空格后检查
  const clean = value.replace(/\s/g, '')
  if (clean.length < 16) {
    return callback(new Error(t('vault.secret_min_length')))
  }
  if (!/^[A-Z2-7]+$/i.test(clean)) {
    return callback(new Error(t('vault.secret_invalid_char')))
  }
  callback()
}

const rules = {
  service: [{ required: true, message: t('vault.require_service'), trigger: 'blur' }],
  account: [{ required: true, message: t('vault.require_account'), trigger: 'blur' }],
  secret: [{ required: true, validator: validateSecret, trigger: 'blur' }]
}

const generateRandomSecret = () => {
  const array = new Uint8Array(20)
  window.crypto.getRandomValues(array)
  newVault.value.secret = bytesToBase32(array)
}

const submitAddVault = async () => {
  if (!addFormRef.value) return
  await addFormRef.value.validate(async (valid) => {
    if (valid) {
      submitting.value = true
      try {
        const data = await vaultService.createAccount(newVault.value)
        if (data.success) {
          ElMessage.success(t('vault.add_success'))
          newVault.value = { service: '', account: '', secret: '', category: '', digits: 6, period: 30, algorithm: 'SHA1' }
          vaultStore.markDirty() // 实际写入数据，标记缓存过期
          emit('success')
        }
      } catch (error) {
      } finally {
        submitting.value = false
      }
    }
  })
}
</script>