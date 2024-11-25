import { fourDotsSpinnerSvg } from '@/assets/svg/loading'
import { menuData } from '@/mock/menuData'
import { MenuListType } from '@/types/menu'
import { ElLoading } from 'element-plus'
import { request } from '@/utils/request'


// 查询菜单列表

// // 创建 menuService 对象，包含 getMenuList 和其他方法
// export const menuService = {
//   // 查询菜单列表
//   getMenuList(query: MenuListType) {
//     return request({
//       url: 'system/menu/list',
//       method: 'get',
//       params: query
//     });
//   },

//   // 其他可能的方法...
// };

// // 默认导出 menuService
// export default menuService;




// 菜单接口
export const menuService = {
  // 获取菜单列表，模拟网络请求
  getMenuList(
    delay: number = 300
  ): Promise<{ menuList: MenuListType[]; closeLoading: () => void }> {
    const loading = createLoading

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          menuList: menuData,
          closeLoading: () => loading.close()
        })
      }, delay)
    })
  }
}

const createLoading = ElLoading.service({
  lock: true,
  background: 'rgba(0, 0, 0, 0)',
  svg: fourDotsSpinnerSvg,
  svgViewBox: '0 0 40 40'
})
