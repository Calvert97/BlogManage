<template>
  <div class="top-bar" :style="{width: topBarWidth}">
    <div class="menu">
      <div class="left" style="display: flex">
        <!-- 系统信息  -->
        <div class="top-header" @click="toHome" v-if="isTopMenu">
          <svg class="svg-icon2" aria-hidden="true">
            <use xlink:href="#icon-zhaopian-copy"></use>
          </svg>
          <p v-if="width >= 1300">{{ SystemInfo.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  // @import './style';
  // @import './mobile';
</style>