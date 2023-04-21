<template>
  <div class="home">
    <router-view />
    <van-tabbar v-model="activeName" fixed route>
      <van-tabbar-item
        v-for="tabbarItem in tabbarList"
        :key="tabbarItem.id"
        :to="tabbarItem.to"
        :name="tabbarItem.name"
        :icon="tabbarItem.icon"
      >
        {{ tabbarItem.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TABBAR_LIST } from '@/constant/enums'

const activeName = ref('home')
const tabbarList = TABBAR_LIST
</script>

<style lang="less" scoped>
  .home {
    padding-bottom: 50px;
    min-height: 100vh;
    background: @default-bg-color;
    box-sizing: border-box;
  }
</style>
