<template>
  <div class="component-title">内置组件</div>
  <div class="component-container">
    <div
      v-for="component in components"
      :key="component.name"
      class="component-item"
    >
      <span class="title">{{ component.name }}</span>
      <span class="desc">{{ component.desc }}</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue'
import { components } from '@/components'

</script>

<style lang="less" scoped>
  .component {
    &-title {
      margin: 0 20px;
      padding: 20px 0;
      font-size: 20px;
      font-weight: bold;
      color: @main-text-color;
    }
    &-container {
      .flex-column;
      margin: 0 20px;
    }
    &-item {
      .flex-row;
      .flex-align-center;
      margin-bottom: 20px;
      padding: 0 16px;
      border-radius: 16px;
      background: #FFF;
      height: 42px;
      font-size: 16px;
      box-shadow: 0px 6px 14px 0px rgba(0, 0, 0, .08);
      color: @main-text-color;
      .title {
        color: @main-text-color;
      }
      .desc {
        margin-left: 8px;
        color: @desc-text-color;
      }
      .van-icon {
        margin-left: auto;
      }
    }
  }
</style>
