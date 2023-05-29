<template>
  <div
    class="float-btn"
    @touchstart="touchstart($event)"
    @touchmove="touchmove($event)"
    @touchend="touchend($event)"
  >
    <svg-icon :icon="icon" />
    <div class="float-btn-text">{{ text }}</div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'FloatBtn',
  desc: '悬浮按钮',
  props: {
    icon: { type: String, desc: '图标名称' },
    text: { type: String, desc: '按钮文字' },
    movable: { type: Boolean, default: false, desc: '是否可移动' }
  },
  setup(props) {
    const timer = ref()
    const isLongClick = ref(false)
    const originGesPos = ref({ x: 0, y: 0 })
    const originElePos = ref({ x: 0, y: 0 })

    const touchstart = (e: TouchEvent) => {
      if (!props.movable) return
      console.log(e)
      // 定时器控制长按时间，超过500毫秒开始进行拖拽
      timer.value = setTimeout(() => {
            isLongClick.value = true
        }, 500)
        const selectDom = e.currentTarget as HTMLElement
        const { pageX, pageY } = e.touches[0] // 手指位置
        const { offsetLeft, offsetTop } = selectDom // 元素位置
        // 手指原始位置
        originGesPos.value = { x: pageX, y: pageY }
        // 元素原始位置
        originElePos.value = { x: offsetLeft, y: offsetTop }
        selectDom.style.left = `${offsetLeft}px`
        selectDom.style.top = `${offsetTop}px`
    }

    const touchmove = (e: TouchEvent) => {
      if (!props.movable) return
      console.log(e)
      // 未达到500毫秒就移动则不触发长按，清空定时器
      clearTimeout(timer.value)
        if (isLongClick.value) {
          const selectDom = e.currentTarget as HTMLElement
          // x轴偏移量
          const lefts = originGesPos.value.x - originElePos.value.x
          // y轴偏移量
          const tops = originGesPos.value.y - originElePos.value.y
          const { pageX, pageY } = e.touches[0] // 手指位置
          selectDom.style.left = `${pageX - lefts}px`
          selectDom.style.top = `${pageY - tops}px`
        }
    }

    const touchend = (e: TouchEvent) => {
      if (!props.movable) return
      console.log(e)
      // 清空定时器
      clearTimeout(timer.value)
      if (isLongClick.value) {
        isLongClick.value = false
        const selectDom = e.currentTarget as HTMLElement
        const { clientWidth, clientHeight } = document.body
        const { offsetLeft, offsetTop } = selectDom
        selectDom.style.left = 
          (offsetLeft + 50) > (clientWidth / 2) ? 
          'calc(100% - 100px)' : '0'
        if (offsetTop < 90) {
          selectDom.style.top = '90px'
        } else if (offsetTop + 36 > clientHeight) {
          selectDom.style.top = `${clientHeight - 36}px`
        }
      }
    }

    return {
      touchstart,
      touchmove,
      touchend
    }
  }
})
</script>

<style lang="less" scoped>
.float-btn {
  .flex-column;
  .flex-center;
  position: fixed;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  box-shadow: 0px 6px 14px 0px rgba(0, 0, 0, .08);
  background: #FFF;
  color: @secondary-text-color;
  z-index: 9;
  &-text {
    font-size: 10px;
  }
}
</style>