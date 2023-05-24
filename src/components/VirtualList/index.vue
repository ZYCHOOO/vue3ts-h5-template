<template>
  <div ref="listWrap" class="virtual-list-wrap" @scroll="scrollListener">
    <div ref="lis†" class="virtual-list">
      <template
        v-for="item in showList"
        :key="item[itemKey]"
      >
        <slot :item-info="item" />
      </template>
    </div>
  </div>

</template>

<script lang="ts">
import { ref, defineComponent, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'VirtualList',
  desc: '虚拟列表',
  props: {
    itemKey: { type: String, default: 'id', desc: 'key标识' },
    listData: { type: Array, default: () => [], desc: '列表数据' }, // 列表数据
    itemHeight: { type: Number, default: 0, desc: '单个子项高度' }, // 单个子项高度
    showNum: { type: Number, default: 0, desc: '给用户展示的数量' }, // 需要给用户展示的数量
    startIndex: { type: Number, default: 0, desc: '起始下标' }, // 起始下标
    endIndex: { type: Number, default: 0, desc: '结束下标' } // 结束下标
  },
  setup(props) {
    const listWrap = ref<HTMLDivElement>() // 获取列表视图模型节点
    const list = ref<HTMLDivElement>() // 获取列表节点
    const start = ref(props.startIndex)
    const end = ref(props.endIndex)

    onMounted(() => {
      // 设置列表视图模型的高度
      listWrap.value!.style.height = props.itemHeight * props.showNum + 'px'
    })

    const showList = computed(() => {
      // 获取展示的列表
      return props.listData.slice(start.value, end.value)
    })

    const scrollListener = () => {
      // 获取滚动高度
      const scrollTop = listWrap.value!.scrollTop

      // 开始索引
      start.value = Math.floor(scrollTop / props.itemHeight)
      // 结束索引
      end.value = start.value + props.showNum

      list.value!.style.transform = `translateY(${start.value * props.itemHeight}px)`// 对列表项进行偏移
    }

    return {
      showList,
      scrollListener
    }
  }
})
</script>

<style lang="less" scoped>
.virtual-list {
  &-wrap {
    overflow-y: scroll;
  }
}
</style>