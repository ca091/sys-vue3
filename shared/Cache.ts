enum CacheKey {
  Token = 'token',
  Lang = 'lang',
  ThemeColor = 'ThemeColor',
}

function get(key: CacheKey, t = 'localStorage') {
  if (!key) return;
  let val = (window as any)[t].getItem(key)
  return (val === 'undefined' || val === null) ? '' : val
}

function getObj(key: CacheKey, t = 'localStorage') {
  if (!key) return;
  let val = (window as any)[t].getItem(key)
  val = val === 'undefined' ? '' : val
  try {
    val = JSON.parse(val) || {}
  } catch (e) {
    val = {}
  }
  return val
}

function set(key: CacheKey, val: any, t = 'localStorage') {
  if (!key || !val) return;
  if (typeof val !== 'string') {
    val = JSON.stringify(val)
  }
  (window as any)[t].setItem(key, val)
}

function remove(key: CacheKey, t = 'localStorage') {
  (window as any)[t].removeItem(key)
}

function clear(t = 'localStorage') {
  (window as any)[t].clear()
}

const Cache = {
  Key: CacheKey,
  local: {
    get(key: CacheKey) {
      return get(key)
    },
    getObj(key: CacheKey) {
      return getObj(key)
    },
    set(key: CacheKey, val: any) {
      set(key, val)
    },
    remove(key: CacheKey) {
      remove(key)
    },
    clear() {
      clear()
    }
  },
  session: {
    get(key: CacheKey) {
      return get(key, 'sessionStorage')
    },
    getObj(key: CacheKey) {
      return getObj(key, 'sessionStorage')
    },
    set(key: CacheKey, val: any) {
      set(key, val, 'sessionStorage')
    },
    remove(key: CacheKey) {
      remove(key, 'sessionStorage')
    },
    clear() {
      clear('sessionStorage')
    }
  }
}

export default Cache
