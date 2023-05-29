<template>
  <div class="profile-index">
    <div class="profile-card">
      <div class="profile-card-info">
        <div class="profile-card-name" v-html="profile.name" />
        <div class="profile-card-mobile" v-html="profile.mobile" />
      </div>
      <img :src="profile.avatar" class="profile-card-avatar" alt="" />
    </div>

    <van-cell-group inset>
      <van-cell
        v-for="item in cellList"
        :key="item.id"
        is-link
        @click="handleCell(item.title)"
      >
        <template #title>
          <svg-icon :icon="item.icon" />
          <span class="cell-title">{{ item.title }}</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="logout-btn" @click="handleLogout">退出登录</div>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { apiLogout } from '@/api/loginApi'
import { loginStore } from '@/store/login'
import { userStore } from '@/store/user'

const cellList = [
  { id: 1, title: '信息管理', icon: 'user' },
  { id: 2, title: '个人收藏', icon: 'star' },
  { id: 3, title: '设置', icon: 'setting' }
]

const user = userStore()
const login = loginStore()
const router = useRouter()
const { profile } = storeToRefs(user)
// console.log(profile.value)

const handleLogout = async () => {
  const res = await apiLogout()
  if (res.code === 200) {
    login.resetToken()
    router.push('/login')
  }
}

const handleCell = (title: string) => {
  showToast({
    message: title,
    position: 'top'
  })
}

</script>

<style lang="less" scoped>
  .profile-index {
    padding: 10px 10px 0 10px;
    min-height: calc(100vh - 60px);
    background: @main-bg-color;
    overflow: auto;
  }
  .profile-card {
    .flex-row;
    .flex-align-center;
    width: 347px;
    height: 186px;
    border-radius: 12px;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, .07);
    background: linear-gradient(90deg, #4685FF 0%, rgba(189,206,255,0.25) 100%);
    &-avatar {
      margin-left: auto;
      margin-right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, .2);
    }
    &-info {
      .flex-column;
      margin-left: 24px;
      color: #FFF;
    }
    &-mobile {
      margin-top: 15px;
      font-size: 14px;
    }
  }
  .logout-btn {
    .flex-center;
    position: absolute;
    bottom: 107px;
    left: 50%;
    width: 167px;
    height: 38px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    border-radius: 4px;
    border: 1px solid rgba(151, 151, 151, 0.5);
    color: rgba(155, 158, 167, 0.7);
    transform: translateX(-50%);
  }
  .van-cell-group {
    margin: 10px 0 0 0;
    .van-cell {
      padding: 10px;
      &::after {
        left: 10px;
        right: 10px;
      }
      .cell-title {
        margin-left: 16px;
      }
    }
  }
</style>
