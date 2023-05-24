<template>
  <div class="component-title">内置组件</div>
  <div class="component-container">
    <div
      v-for="component in components"
      :key="component.name"
      class="component-cell"
      @click="doCellClick(component)"
    >
      <div class="component-cell-header">
        <span class="title">{{ component.name }}</span>
        <span class="desc">{{ component.desc }}</span>
        <van-icon
          name="arrow"
          :class="activeComponent.name === component.name ? 'active' : ''"
        />
      </div>

      <div
        class="component-cell-body"
        :class="activeComponent.name === component.name ? 'active' : ''"
      >
        <span v-for="(prop, key) in component.props">参数名：{{ key }} - {{ prop.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { components } from '@/components'

const activeComponent = ref({ name: '' })

const doCellClick = (component: any) => {
  if (component.name! === activeComponent.value.name) {
    activeComponent.value = { name: '' }
    return
  }
  activeComponent.value = component
}

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
    &-cell {
      .flex-column;
      margin-bottom: 20px;
      padding: 0 16px;
      border-radius: 16px;
      background: #FFF;
      font-size: 16px;
      box-shadow: 0px 6px 14px 0px rgba(0, 0, 0, .08);
      color: @main-text-color;
      
      &-header {
        .flex-row;
        .flex-align-center;
        height: 42px;
        .title {
          color: @main-text-color;
        }
        .desc {
          margin-left: 8px;
          color: @desc-text-color;
        }
        .van-icon {
          margin-left: auto;
          transition: all .3s ease;
          &.active {
            transform: rotate(90deg);
          }
        }
      }

      &-body {
        .flex-column;
        .flex-justify-center;
        max-height: 0;
        overflow: hidden;
        transition: max-height .5s linear;
        &.active {
          max-height: 200px;
        }
        span {
          margin-bottom: 8px;
        }
      }
    }
  }
</style>
