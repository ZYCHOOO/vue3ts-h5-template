<template>
  <div class="news-detail">
    <div class="news-detail-title" v-html="newsDetail?.title" />
    <div class="news-detail-info">
      <div class="news-detail-author" v-html="newsDetail?.author_name" />
      <div class="news-detail-date" v-html="newsDetail?.date" />
    </div>
    <div class="news-detail-content" v-html="newsDetail?.content" />
  </div>
  <float-btn
    icon="home"
    text="首页"
    @click.native="doBackHome"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiGetNewsDetail } from '@/api/newsApi'
import { JH_NEWS_KEY } from '@/constant/enums'

interface newsDetail {
  content: string,
  detail: string,
  title: string,
  date: string,
  category: string,
  author_name: string
}

const route = useRoute()
const router = useRouter()
const uniquekey = computed(() => {
  return route.params.id
})
const newsDetail = ref<newsDetail>()

const doBackHome = () => {
  router.go(-1)
}

const getNewsDetail = async () => {
  const res = await apiGetNewsDetail({ key: JH_NEWS_KEY, uniquekey: uniquekey.value })
  newsDetail.value = {
    content: res.result.content,
    ...res.result.detail
  }
}

getNewsDetail()

</script>

<style lang="less" scoped>
  .news-detail {
    padding: 10px;
    &-title {
      font-size: 16px;
      color: @main-text-color;
    }
    &-info {
      .flex-row;
      padding: 8px 0;
      font-size: 12px;
      border-bottom: 1px solid #eee;
      color: @secondary-text-color;
    }
    &-date {
      margin-left: auto;
    }
    &-content {
      font-size: 14px;
    }
  }
  .float-btn {
    bottom: 20px;
    right: 16px;
  }
</style>
