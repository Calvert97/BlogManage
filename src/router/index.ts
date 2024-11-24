import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { useWorktabStore } from '@/store/modules/worktab'
import Home from '@views/index/index.vue'
import { SystemInfo } from '@/config/setting'
import { useUserStore } from '@/store/modules/user'
import { menuService } from '@/api/menuApi'
import { routerMatch } from '@/utils/menu'
import { useMenuStore } from '@/store/modules/menu'
import { useSettingStore } from '@/store/modules/setting'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 顶部进度条配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 600, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  parent: 'body' //指定进度条的父容器
})

// 路由项扩展
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

// 首页
export const HOME_PAGE = '/dashboard/console'

// 不需要权限的路由
const routes = [
  {
    path: '/',
    redirect: HOME_PAGE
  },
  {
    path: '/dashboard',
    component: Home,
    meta: {
      title: '监控中心',
      title_en: 'Dashboard'
    },
    children: [
      {
        path: 'console',
        name: 'Console',
        component: () => import(`@views/dashboard/console/index.vue`),
        meta: {
          title: '工作台',
          title_en: 'Workbench',
          keepAlive: false
        }
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import(`@views/dashboard/analysis/index.vue`),
        meta: {
          title: '分析页',
          title_en: 'Workbench',
          keepAlive: false
        }
      }
    ]
  },
] as AppRouteRecordRaw[]

export const router = createRouter({
  history: createWebHashHistory(), // history 模式
  routes: routes, // 路由表
  scrollBehavior: () => ({ left: 0, top: 0 }) // 页面滚动行为
})

// 需要权限的路由
export const roleRoutes: AppRouteRecordRaw[] = [
  {
    path: '/user',
    name: 'User',
    component: Home,
    meta: {
      title: '用户管理',
    },
    children: [
      {
        path: '/user/user' ,
        name: 'Users',
        component: () => import('@views/user/User.vue'),
        meta: {
          title: '个人中心',
        }
      }
    ]
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Home,
    meta: {
      title: '菜单管理',
      title_en: 'Menu Management'
    },
    children: [
      {
        path: '/menu/menu',
        name: 'Menus',
        component: () => import('@views/menu/Menu.vue'),
        meta: {
          title: '菜单管理',
          title_en: 'Menu Management',
          keepAlive: true
        }
      },
      {
        path: '/menu/permission',
        name: 'Permission',
        component: () => import('@views/menu/Permission.vue'),
        meta: {
          title: '权限控制',
          title_en: 'Permission Control',
          keepAlive: true
        }
      },
      {
        path: '/menu/nested',
        name: 'Nested',
        meta: {
          title: '嵌套菜单',
          title_en: 'Nested Menu'
        },
        children: [
          {
            path: '/menu/nested/menu1',
            name: 'NestedMenu1',
            component: () => import('@views/menu/nested/menu1.vue'),
            meta: {
              title: '菜单1',
              title_en: 'Menu 1',
              keepAlive: true
            }
          },
          {
            path: '/menu/nested/menu2',
            name: 'NestedMenu2',
            meta: {
              title: '菜单2',
              title_en: 'Menu 2'
            },
            children: [
              {
                path: '/menu/nested/menu2/menu2-1',
                name: 'NestedMenu2-1',
                component: () => import('@views/menu/nested/menu2/menu2-1.vue'),
                meta: {
                  title: '菜单2-1',
                  title_en: 'Menu 2-1',
                  keepAlive: true
                }
              }
            ]
          },
          {
            path: '/menu/nested/menu3',
            name: 'NestedMenu3',
            meta: {
              title: '菜单3',
              title_en: 'Menu 3'
            },
            children: [
              {
                path: '/menu/nested/menu3/menu3-1',
                name: 'NestedMenu3-1',
                component: () => import('@views/menu/nested/menu3/menu3-1.vue'),
                meta: {
                  title: '菜单3-1',
                  title_en: 'Menu 3-1',
                  keepAlive: true
                }
              },
              {
                path: '/menu/nested/menu3/menu3-2',
                name: 'NestedMenu3-2',
                meta: {
                  title: '菜单3-2',
                  title_en: 'Menu 3-2'
                },
                children: [
                  {
                    path: '/menu/nested/menu3/menu3-2/menu3-2-1',
                    name: 'NestedMenu3-2-1',
                    component: () => import('@views/menu/nested/menu3/menu3-2/menu3-2-1.vue'),
                    meta: {
                      title: '菜单3-2-1',
                      title_en: 'Menu 3-2-1',
                      keepAlive: true
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

]

export const allRoutes = roleRoutes

// 是否注册路由
const isRouteRegistered = ref(false)

router.beforeEach(async (to, from, next) => {
  if (useSettingStore().showNprogress) {
    NProgress.start()
  }

  const userStore = useUserStore()
  const worktabStore = useWorktabStore()
  const { meta, path, params, query } = to
  const { title, title_en: titleEn, notTab, noLogin } = meta

  if (!userStore.isLogin && path !== '/login' && !noLogin) {
    userStore.logOut()
    next('/login')
    return
  }

  // 获取菜单，注册路由
  if (!isRouteRegistered.value) {
    try {
      await registerRoutes()
      next({ ...to, replace: true })
    } catch (error) {
      console.error('Failed to register routes:', error)
      next('/exception/500')
    }
    return
  }

  if (to.matched.length === 0) {
    next('/exception/404')
    return
  }

  if (!notTab) {
    worktabStore.router({
      title: title as string,
      title_en: titleEn as string,
      path,
      params,
      query
    })
  }

  if (title) {
    document.title = `${title} - ${SystemInfo.name}`
  }

  next()
})

router.afterEach(() => {
  if (useSettingStore().showNprogress) {
    NProgress.done()
  }
})

// 获取菜单，注册路由
async function registerRoutes(): Promise<void> {
  try {
    const { menuList, closeLoading } = await menuService.getMenuList()

    if (!Array.isArray(menuList) || menuList.length === 0) {
      throw new Error('获取菜单列表未空')
    }

    // 设置菜单列表
    useMenuStore().setMenuList(menuList as [])
    // 注册路由
    routerMatch(menuList, roleRoutes)
    isRouteRegistered.value = true
    closeLoading()
  } catch (error) {
    console.error('获取菜单列表失败:', error)
    throw error
  }
}

export function initRouter(app: App<Element>) {
  app.use(router)
}
