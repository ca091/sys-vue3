import { ref, reactive } from 'vue'
import zh from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { Langs, $t as t } from '@/plugins/i18n/messages'
import Cache from '@shared/Cache'

// 初始化设置
let langName: Langs = 'zh-cn'
let langObj = zh
let l = Cache.local.get(Cache.Key.Lang)
if (l === 'en') {
  langName = l
  langObj = en
}

let lang = ref(langName)
let langMsg = reactive({
  name: langObj.name,
  el: langObj.el,
})

function $t(text: unknown, l = lang.value): unknown {
  if (typeof text !== 'string') return text
  return t(text, l)
}

function changeLanguage(l: Langs) {
  if (lang.value === l) return
  lang.value = l
  langMsg.name = l
  if (l === 'zh-cn') {
    langMsg.el = zh.el
  } else if (l === 'en') {
    langMsg.el = en.el
  }
  Cache.local.set(Cache.Key.Lang, l)
}

export function useLanguageWatcher() {
  return {
    lang,
    langMsg,
    $t,
    changeLanguage,
  }
}
