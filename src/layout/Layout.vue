<template>
  <el-container id="main-container">
    <el-aside :style="{ width: isCollapse ? 'auto' : '200px' }">
      <Sider :is-collapse="isCollapse"></Sider>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <div id="main-content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import emitter from '@/plugins/event'
import Sider from './Sider.vue'
import Header from './Header.vue'

let isCollapse = ref(false)

function setIsCollapse() {
  // width = sider + #main-content + padding * 2 + scrollWidth
  isCollapse.value = document.documentElement.clientWidth < (200 + 1024 + 30 * 2 + 16)
}

onMounted(() => {
  setIsCollapse()
  emitter.on('resize', setIsCollapse)
})
</script>

<style lang="less" scoped>
#main-container :deep(.el-menu) {
  height: 100%;
  overflow: hidden;
}
// 定宽-响应式
// #main-content{
//   min-width: 1024px;
// }
// 定宽-固定
#main-content {
  width: 1024px;
  margin: auto;
}
@media screen and (min-width: 1920px) {
  #main-content {
    width: 1374px;
  }
}
:deep(.el-header) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
:deep(.el-main) {
  padding: 30px;
  background-color: #f7f7f7;
}
</style>
