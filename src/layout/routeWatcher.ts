import { watchEffect, reactive } from 'vue'
import {
  useRoute,
  useRouter,
  RouteLocationMatched,
  RouteRecordNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'

interface Matched {
  matched: RouteRecordNormalized[]
}

let obj: Matched = {
  matched: [],
}
let breadcrumbs = reactive(obj)
let currentRoute: Partial<RouteLocationNormalizedLoaded> = reactive({
  meta: {},
  path: '',
})

export function useRouteWatcher() {
  const route = useRoute()
  const routes = useRouter().getRoutes()

  // console.log('routes', routes)

  function getNestedBreadcrumbs(matched: RouteLocationMatched[]) {
    let re: RouteRecordNormalized[] = []
    for (let m of matched) {
      if (m.meta.belong) {
        let belongRoute = routes.find(r => r.path === m.meta.belong)
        if (belongRoute) re.push(belongRoute)
      }
      re.push(m)
    }
    return re
  }

  function routeChangeHandler() {
    // console.log('routeChangeHandler route', route.meta, route.path)
    ;({
      // matched: breadcrumbs.matched,
      meta: currentRoute.meta,
      path: currentRoute.path,
    } = route)
    breadcrumbs.matched = getNestedBreadcrumbs(route.matched)
  }

  watchEffect(routeChangeHandler)

  return {
    breadcrumbs,
    currentRoute,
  }
}
