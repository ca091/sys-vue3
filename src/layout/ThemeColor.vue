<template>
  <el-color-picker v-model="themeColor"/>
</template>

<script lang="ts" setup>
import { useThemeWatcher } from '@/plugins/theme'

let {themeColor} = useThemeWatcher()
</script>
