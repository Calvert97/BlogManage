<template>
  <div class="frame" :style="paddingLeft, paddingTop">
  <!-- 顶栏 -->
  <top-bar>
    <template #default>
      <!-- <work-tab v-if="showWorkTab"></work-tab> -->
      123
    </template>
  </top-bar>
  </div>
</template>

<script setup lang="ts"> 
  import '@/assets/styles/transition.scss'
  import TopBar from "@comps/Layout/TopBar/index.vue";
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