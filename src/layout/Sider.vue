<template>
  <el-menu
    text-color="rgb(226,226,226)"
    background-color="#1a1a1a"
    active-text-color="#ffd04b"
    :default-active="defaultActive"
    :unique-opened="true"
    :router="false"
    :collapse="isCollapse"
  >
    <DeepRoute :menu-array="MenuArray"></DeepRoute>
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import DeepRoute from './DeepRoute.vue'
import { checkRoutePermission } from '@shared/Permissions'
import { useRouteWatcher } from './routeWatcher'

defineProps<{
  isCollapse: boolean
}>()
const router = useRouter()
let {currentRoute} = useRouteWatcher()
let defaultActive = computed(() => currentRoute.meta!.nav === true ? currentRoute.path : currentRoute.meta!.belong || '')
let index = 0

// 为子路由设置 fullPath
function fillPath(path: string, routes: RouteRecordRaw[]) {
  for (let r of routes) {
    let fullPath = (path === '/' ? '' : path) + '/' + r.path
    r.meta!.fullPath = fullPath
    r.meta!.id = String(++index)
    if (r.children?.length) {
      fillPath(fullPath, r.children)
    }
  }
}

const MenuArray = router.getRoutes()
  .filter(i => i.children.length && i.meta?.nav === true)
  .sort((a, b) => (a.meta.sort as number > (b.meta.sort as number)) ? 1 : -1)
  .map(i => {
    i.meta.fullPath = i.path
    i.meta.id = String(++index)
    fillPath(i.path, i.children)
    // 若子路由只有一个，不折叠菜单
    let r = i.children.length === 1 ? i.children[0] : i
    return {
      ...r,
      children: r.children?.filter(i => i.meta?.nav === true && checkRoutePermission(i.name as string)),
    }
  })
</script>
