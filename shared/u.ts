export function throttle(fn: Function, duration: number) {
  let st = performance.now()
  return (...args: any[]) => {
    let emitT = performance.now()
    if (emitT - st > duration) {
      fn(...args)
      st = emitT
    }
  }
}

export const objectToString = Object.prototype.toString

export const toTypeString = (value: unknown): string => objectToString.call(value)

export const toRawType = (value: unknown): string => {
  // extract "RawType" from strings like "[object RawType]"
  return toTypeString(value).slice(8, -1)
}

// 剔除空串
export function deleteNullValue(data: Record<string, any>): Record<string, any> {
  let keys = Object.keys(data)
  let filterData: Record<string, any> = {}
  for (let k of keys) {
    let v = data[k]
    if (toRawType(v) === 'Object') {
      filterData[k] = deleteNullValue(v)
    } else if (v !== '' && v !== undefined && v !== null) {
      filterData[k] = v
    }
  }
  return filterData
}

export function getSearchParams() {
  let qs: Record<string, any> = {}

  new URL(location.href).searchParams.forEach(((value, key) => {
    qs[key] = value
  }))

  return qs
}
