<template>
  <!-- 外部 svg -->
  <div
    v-if="isExternal"
    :style="externalIconStyle"
    class="svg-icon svg-icon--external"
    :class="className"
  />
  <!-- 内部 svg -->
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>

<script lang="ts">
import { isExternal as external } from '@/utils/validate'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    icon: { type: String, required: true },
    className: { type: String, default: '' }
  },
  setup(props) {
    const isExternal = computed(() => external(props.icon))

    const externalIconStyle = computed(() => ({
      mask: `url(${props.icon}) no-repeat 50% 50%`,
      '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
    }))

    return {
      isExternal,
      externalIconStyle
    }
  }
})
</script>

<style lang="less" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -.15em;
    fill: currentColor;
    overflow: hidden;

    &--external {
      background-color: currentColor;
      mask-size: cover !important;
      display: inline-block;
    }
  }
</style>
