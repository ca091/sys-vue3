// 权限码表
export const PMap: Record<string, string> = {
  liveList: '0000',
  liveCreate: '0001',
  vodeCreate: '0002',
}

// 实际从接口获取; 最多包含两层权限关系（默认路由是第一级，子功能是第二级）; 0/1代表有无权限
const P = {
  [PMap.liveList]: {
    [PMap.liveCreate]: 0,
    [PMap.vodeCreate]: 1
  },
  [PMap.liveCreate]: 0
}

export const FlatP = flatPermission()

export function getPermissions() {
  return P
}

export function flatPermission() {
  let re: Record<string, number> = {}
  for (let p in P) {
    if (typeof P[p] === 'object') {
      // @ts-ignore
      re = { ...re, ...P[p] }
    } else {
      // @ts-ignore
      re = { ...re, [p]: P[p] }
    }
  }
  return re
}

export function checkPermission(code: string): boolean {
  let re = FlatP[code]
  return re === undefined ? false : Boolean(re)
}

// 根据路由名称校验
export function checkRoutePermission(name: string): boolean {
  let code = PMap[name]
  if (code) {
    let re = P[code]
    if (typeof re === 'number') {
      return Boolean(re)
    } else {
      return true
    }
  }
  return true
}

export default P
