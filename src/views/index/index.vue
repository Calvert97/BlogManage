<template>
  <div class="frame" :style="paddingLeft, paddingTop">

  
    <!-- 顶栏 -->
  <top-bar>
      <template #default>
        <work-tab v-if="showWorkTab"></work-tab>
      </template>
    </top-bar>

    <!-- 左侧菜单 -->
     <menu-left v-if="menuType === MenuTypeEnum.LEFT"></menu-left>

    
  </div>
</template>

<script setup lang="ts"> 
  import '@/assets/styles/transition.scss'
  import TopBar from "@comps/Layout/TopBar/index.vue";

  import { MenuWidth, MenuTypeEnum } from '@/enums/appEnum'

  import { useMenuStore } from '@/store/modules/menu'
  import { useSettingStore } from '@/store/modules/setting'

  // 获取菜单和设置信息的 store
  const settingStore = useSettingStore()
  const menuStore = useMenuStore()

  // 菜单是否打开
  const menuOpen = computed(() => settingStore.menuOpen) 

    // 是否显示工作标签
    const showWorkTab = computed(() => settingStore.showWorkTab)

  // 菜单类型
  const menuType = computed(() => settingStore.menuType)

  // 根据菜单是否打开来设置左侧填充宽度
  const paddingLeft = computed(() => {
  const width = menuOpen.value ? MenuWidth.OPEN : MenuWidth.CLOSE
  menuStore.setMenuWidth(width) // 更新菜单宽度
  return menuType.value === MenuTypeEnum.LEFT ? width : 0
  })


  // 根据是否显示工作标签来设置最小高度
  const minHeight = computed(() => `calc(100vh - ${showWorkTab.value ? 120 : 75}px)`)

  const paddingTop = computed(() => {
    return showWorkTab.value ? '110px' : '60px'
  })


</script>

<style lang="scss" scoped>
  .frame {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding: 108px 0 15px;
    overflow: hidden;
    background: var(--art-bg-color);
    transition: padding 0.3s ease-in-out;

    .container {
      box-sizing: border-box;
      width: calc(100% - 40px);
      margin: auto;

      // 子页面默认style
      :deep(.page-content) {
        position: relative;
        box-sizing: border-box;
        padding: 20px;
        overflow: hidden;
        background: var(--art-main-bg-color);
        border-radius: 6px;
      }
    }
  }

  @media only screen and (max-width: $device-ipad) {
    .frame {
      width: 100%;
      min-height: 100vh;
      padding-left: 0 !important;
      overflow-y: scroll;

      .container {
        width: calc(100% - 20px);
      }
    }
  }

  @media only screen and (max-width: $device-phone) {
    .frame {
      .container {
        width: calc(100% - 32px);
      }
    }
  }
</style>