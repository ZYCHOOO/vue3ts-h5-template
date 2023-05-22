<template>
  <div ref="listWrap" class="virtual-list-wrap">
    <div ref="lis†" class="virtual-list">

    </div>
    VirtualList component
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'VirtualList',
  desc: '虚拟列表',
  props: {
    itemKey: { type: String, default: 'id' },
    listData: { type: Array, default: () => [] }, // 列表数据
    itemHeight: { type: Number, default: 0 }, // 单个子项高度
    showNum: { type: Number, default: 0 }, // 需要给用户展示的数量
    startIndex: { type: Number, default: 0 }, // 起始下标
    endIndex: { type: Number, default: 0 } // 结束下标
  },
  setup(props, ctx) {}
})
</script>

<style lang="less" scoped>
.virtual-list {
  &-wrap {}
}
</style>