import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import Home from '@views/index/index.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// 顶部进度条配置
NProgress.configure({
  easing: 'ease', //动画方式
  speed: 600, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  parent: 'body' //指定进度条父容器
})

// 路由项配置 
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
  history: createWebHashHistory(), // history模式
  routes: routes, // 路由表
  scrollBehavior:()=> ({ left: 0, top: 0 }) // 页面滚动行为
  })

  
  export function initRouter(app: App<Element>) {
    app.use(router)
  }