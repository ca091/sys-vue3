import mitt from 'mitt'
import { throttle } from '@shared/u'
import { Langs } from '@/plugins/i18n/messages'

type Events = {
  resize: any
  changeLanguage: Langs,
}

const emitter = mitt<Events>()

export function registerMainEvents() {
  window.addEventListener('resize', throttle((e: Event) => {
    emitter.emit('resize', e)
  }, 100))
}

export default emitter
