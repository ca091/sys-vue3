<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="r of matched" :to="{ path: r.path }" :key="r.path">{{
        $t(r.meta.label)
      }}
    </el-breadcrumb-item>
  </el-breadcrumb>

  <div class="h-r">
    <ThemeColor></ThemeColor>
    <Lang></Lang>
    <el-dropdown>
      <div class="head-pic">
        <i class="iconfont-saas icon-saas-zhanghu"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="quitLogin">
            <i class="iconfont-saas icon-saas-tuichu"></i>
            {{ $t('退出登录') }}
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="{ name: 'accInfo' }">
              <i class="iconfont-saas icon-saas-zhanghu"></i>
              {{ $t('账户信息') }}
            </router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import ThemeColor from './ThemeColor.vue'
import Lang from './Lang.vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import Cache from '@shared/Cache'
import { useRouteWatcher } from './routeWatcher'
import { useLanguageWatcher } from '@/plugins/i18n/languageWatcher'

let {$t} = useLanguageWatcher()
let {breadcrumbs} = useRouteWatcher()
let matched = computed(() => breadcrumbs.matched.filter(r => r.path !== '/'))
let router = useRouter()

function quitLogin() {
  Cache.local.clear()
  router.replace({name: 'login'})
}
</script>

<style scoped>
.head-pic {
  padding: 10px;
  cursor: pointer;
}
.h-r {
  display: flex;
  align-items: center;
}
</style>
