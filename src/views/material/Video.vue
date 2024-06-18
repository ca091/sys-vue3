<template>
  <div>
    音视频
    <el-button round v-preventFocus v-preventReClick="1000" @click="onClick">测试按钮</el-button>
  </div>
</template>

<script lang="ts" setup>
function onClick() {
  console.log('onClick')
}
</script>