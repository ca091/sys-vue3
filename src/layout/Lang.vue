<template>
  <el-dropdown>
    <div class="langs">
      <i class="iconfont-saas icon-saas-language"></i>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeLanguage('zh-cn')" :class="{ active: lang === 'zh-cn' }">
          <i class="iconfont-saas icon-saas-a-yuyanzhongwen"></i>
          中文
        </el-dropdown-item>
        <el-dropdown-item @click="changeLanguage('en')" :class="{ active: lang === 'en' }">
          <i class="iconfont-saas icon-saas-a-yuyanyingwen"></i>
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useLanguageWatcher } from '@/plugins/i18n/languageWatcher'

let {changeLanguage, lang} = useLanguageWatcher()
</script>

<style lang="less" scoped>
.langs {
  margin-left: 10px;
  padding: 10px;
  cursor: pointer;
}
:deep(.active) {
  color: var(--el-color-primary);
}
</style>
