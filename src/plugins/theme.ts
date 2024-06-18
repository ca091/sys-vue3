import { ref, watch } from 'vue'
import Cache from '@shared/Cache'

// 初始化设置
let initColor = Cache.local.get(Cache.Key.ThemeColor)
if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(initColor)) {
  initColor = '#ffd021'
}
let themeColor = ref(initColor)

export function useThemeWatcher() {
  return {
    themeColor,
  }
}

function setThemeColor(color: string) {
  document.documentElement.style.setProperty('--el-color-primary', color)
  Cache.local.set(Cache.Key.ThemeColor, color)
}

export default {
  install() {
    setThemeColor(themeColor.value)

    watch(themeColor, () => {
      console.log('theme color changed')
      setThemeColor(themeColor.value)
    })
  }
}
