<template>
  <template v-for="menu of menuArray">
    <el-sub-menu v-if="menu.children?.length" :index="menu.meta.fullPath" :key="menu.meta.id">
      <template #title>
        <i class="iconfont-saas" :class="menu.meta.icon"></i>
        <span>{{ $t(menu.meta?.label) }}</span>
      </template>

      <DeepRoute :menu-array="menu.children || []"></DeepRoute>
    </el-sub-menu>

    <router-link v-else :to="menu.meta.fullPath">
      <el-menu-item :index="menu.meta.fullPath" :key="`single-${menu.meta.id}`">
        <i class="iconfont-saas" :class="menu.meta.icon"></i>
        <template #title>{{ $t(menu.meta?.label) }}</template>
      </el-menu-item>
    </router-link>
  </template>
</template>

<script setup lang="ts">
import { useLanguageWatcher } from '@/plugins/i18n/languageWatcher'

let {$t} = useLanguageWatcher()

defineProps<{
  menuArray: any[]
}>()
</script>

<style scoped>
.iconfont-saas {
  margin-right: 4px;
}
a {
  text-decoration: none;
}
</style>
