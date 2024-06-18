export default {
  install(app: any) {
    // 防重复点击
    app.directive('preventReClick', {
      mounted(el: HTMLElement, binding: any) {
        el.addEventListener('click', () => {
          if (el.style.pointerEvents !== 'none') {
            el.style.pointerEvents = 'none'
            setTimeout(() => {
              el.style.pointerEvents = 'auto'
            }, binding.value || 1000)
          }
        })
      },
    })

    // 按钮取消focus样式
    app.directive('preventFocus', {
      mounted(el: HTMLElement) {
        el.addEventListener('click', () => {
          el.blur()
        })
      },
    })

  }
}
