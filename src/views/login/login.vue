<template>
  <div class="login-wrapper">
    <div class="login-wrapper-title">vue3ts-h5-代码模版</div>
    <van-cell-group inset>
      <van-field
        v-model="username"
        label="账号"
        placeholder="请输入账号"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <div
      class="login-wrapper-btn"
      @click="handleLogin"
    >
      登 录
    </div>
    <div
      class="login-wrapper-forget"
      @click="handleForget"
    >
      忘记密码？
    </div>

  </div>
</template>

<script setup lang="ts">
import { showSuccessToast, showFailToast } from 'vant'
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { apiLogin } from '@/api/login'
import { loginStore } from '@/store/login'
import { userStore } from '@/store/user'

const loginEffect = () => {
  const user = userStore()
  const login = loginStore()
  const router = useRouter()
  const loginForm = reactive({ username: '', password: '' })
  const { username, password } = toRefs(loginForm)
  const loginValidate = () => {
    if (!username.value || !password.value) {
      showFailToast('账号或密码不能为空！')
      return false
    }
    return true
  }
  const handleLogin = async () => {
    if (loginValidate()) {
      const result = await apiLogin({ username: username.value, password: password.value })
      const { token } = result.data
      login.setToken(token)
      await user.getProfile(token)
      showSuccessToast('登陆成功！')
      router.push('/home')
    }
  }
  return { username, password, handleLogin }
}
const forgetEffect = () => {
  const handleForget = () => {
    // router.push('/forgetPassword')
  }
  return { handleForget }
}

const { username, password, handleLogin } = loginEffect()
const { handleForget } = forgetEffect()
</script>

<style lang="less" scoped>
  @import '@/styles/views/login.less';
</style>
