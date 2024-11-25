import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()

export function initStore(app: App<Element>) {
  app.use(store)
}

// 默认导出 store
export default store
