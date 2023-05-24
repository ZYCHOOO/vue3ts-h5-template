<template>
  <div class="news-cell" @click="doItemClick(item?.uniquekey)">
    <img
      :src="item?.thumbnail_pic_s"
      alt=""
      class="news-cell-thumbnail"
    >
    <div class="news-cell-info">
      <div class="news-cell-title" v-html="item?.title" />
      <div class="news-cell-subinfo">
        <div class="news-cell-author" v-html="item?.author_name" />
        <div class="news-cell-date" v-html="item?.date" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export interface NewsOption {
  uniquekey: string,
  url: string,
  title: string,
  category: string,
  date: string,
  is_content: string,
  author_name: string,
  thumbnail_pic_s: string,
  thumbnail_pic_s02: string,
  thumbnail_pic_s03: string
}

export default defineComponent({
  name: 'NewsCell',
  desc: '新闻单元格',
  props: {
    item: { type: Object, desc: '新闻单元格内容' }
  },
  setup() {
    const router = useRouter()
    const doItemClick = (id: number) => {
      router.push(`/newsDetail/${id}`)
    }
    return { doItemClick }
  }
})

</script>

<style lang="less" scoped>
.news-cell {
  .flex-row;
  .flex-justify-center;
  margin: 0 10px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &-thumbnail {
    width: 100px;
  }
  &-info {
    flex: 1;
    margin-left: 8px;
  }
  &-subinfo {
    .flex-row;
    margin-top: 10px;
    font-size: 12px;
    color: @secondary-text-color;
  }
  &-title {
    font-size: 16px;
    color: @main-text-color;
  }
  &-date {
    margin-left: auto;
  }
  
}
</style>
