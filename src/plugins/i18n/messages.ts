import En from './en'

export interface Messages {
  en: Record<string, string>
  'zh-cn'?: Record<string, string>
}

export type Langs = keyof Messages

const Msg: Messages = {
  en: {
    ...En,
  },
}

export function $t(text: string, lang: Langs): string {
  if (lang === 'zh-cn') return text
  else {
    let map = Msg[lang]
    if (map) {
      return map[text] || text
    } else {
      return text
    }
  }
}

export default Msg
