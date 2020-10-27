<!--
 * @Date: 2020-07-03 11:05:22
 * @LastEditors: fy
 * @LastEditTime: 2020-08-26 09:35:32
 * @FilePath: /nearby-oa-public/src/modules/approval/components/Steps.vue
-->
<template>
  <div class="steps">
    <a-steps :current="current">
      <a-step v-for="item in progress" :title="item.title" :key="item.title"></a-step>
    </a-steps>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    progress: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.steps {
  padding: 20px;
}
</style>
