<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useLanguageWatcher } from '@/plugins/i18n/languageWatcher'

let {langMsg} = useLanguageWatcher()
</script>

<template>
  <el-config-provider :locale="langMsg">
    <router-view></router-view>
  </el-config-provider>
</template>
