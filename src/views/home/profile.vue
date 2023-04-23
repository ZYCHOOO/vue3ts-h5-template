<template>
  <div class="profile-index">
    <div class="profile-card" />
    <div class="logout-btn" @click="handleLogout">退出登录</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { apiLogout } from '@/api/login'
import { loginStore } from '@/store/login'

const store = loginStore()
const router = useRouter()
const handleLogout = async () => {
  const res = await apiLogout()
  store.resetToken()
  router.push('/login')
}

</script>

<style lang="less" scoped>
  .profile-index {
    padding: 10px;
    min-height: 100vh;
    background: @main-bg-color;
    overflow: auto;
  }
  .profile-card {
    width: 347px;
    height: 186px;
    border-radius: 12px;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, .07);
    background: linear-gradient(90deg, #4685FF 0%, rgba(189,206,255,0.25) 100%);
  }
  .logout-btn {
    .flex-center;
    position: fixed;
    bottom: 107px;
    left: 50%;
    width: 167px;
    height: 38px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    border-radius: 4px;
    border: 0.01rem solid rgba(151, 151, 151, 0.5);
    color: rgba(155, 158, 167, 0.7);
    transform: translateX(-50%);
  }
</style>
