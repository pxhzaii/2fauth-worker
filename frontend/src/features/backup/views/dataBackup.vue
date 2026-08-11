<template>
  <div class="data-backup-wrapper">
    <div class="tab-card-wrapper">
      <div class="text-center mb-30">
        <h2>{{ $t('backup.center_title') }}</h2>
        <p class="text-secondary">{{ $t('backup.center_desc') }}</p>
      </div>
      <BackupSettings @restore-success="$emit('success')" />
    </div>
  </div>
</template>

<script setup>
import BackupSettings from '@/features/backup/components/backupSettings.vue'

const emit = defineEmits(['success'])
</script>