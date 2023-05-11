<template>
  <van-nav-bar
    v-if="showNavbar"
    :title="(route.meta.title as string)"
    left-text="返回"
    left-arrow
    @click-left="router.back()"
  />
  <router-view />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const showNavbar = computed(() => { return route.meta.showNavbar })
</script>

<style lang="less" scoped>

</style>
