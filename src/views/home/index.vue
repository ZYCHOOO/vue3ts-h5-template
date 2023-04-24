<template>
  <div class="home-index">
    <van-tabs v-model:active="activeName" sticky>
      <van-tab
        v-for="tabItem in NEWS_TABS"
        :key="tabItem.id"
        :title="tabItem.title"
        :name="tabItem.name"
      > 
        <news-item
          v-for="newsItem in newsList"
          :key="newsItem.uniquekey"
          :item="newsItem"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NEWS_TABS } from '@/constant/enums'
import { apiGetNewsList } from '@/api/news'
import { JH_NEWS_KEY } from '@/constant/enums'
import NewsItem, { NewsOption } from '@/components/NewsItem/index.vue'

const activeName = ref<string>('top')
const newsList = ref<NewsOption[]>([])

watch(() => activeName.value, (val: string) => {
  getNewsList(val)
})

const getNewsList = async (type?: string) => {
  const res = await apiGetNewsList({ key: JH_NEWS_KEY, type })
  newsList.value = res.result.data
  console.log(newsList.value)
}

getNewsList()

</script>

<style lang="less" scoped>
  .home-index {
    padding: 10px 0;
    min-height: 100vh;
    background: @main-bg-color;
  }
</style>
