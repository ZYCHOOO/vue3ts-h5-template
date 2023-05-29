<template>
  <div class="forget-password">
    <span class="forget-password-title">找回密码</span>
    <van-cell-group inset>
      <van-field
        v-model="mobile"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="sms"
        label="验证码"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobile = ref<number>()
const sms = ref<number>()


</script>

<style lang="less" scoped>
  .forget-password {
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    .flex-column;
    .flex-center;
    :deep .van-cell-group--inset {
      margin: 0 55px;
      border-radius: 0;
      border-bottom: 1px solid rgba(174, 188, 212, 0.3);
    }
    :deep .van-cell {
      padding: 14px 0 15px;
      &__title {
        margin-right: 20px;
        width: 60px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: @main-text-color;
      }
      &::after {
        left: 0;
        right: 0;
        border-bottom: 1px solid rgba(174, 188, 212, 0.3);
        transform: none;
      }
    }
    &-title {
      margin: 0 auto 57px;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      text-align: center;
      color: @main-text-color;
    }
  }
</style>
