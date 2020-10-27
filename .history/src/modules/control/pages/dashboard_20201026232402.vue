<!--
 * @Date: 2020-09-03 09:28:16
 * @LastEditors: fy
 * @LastEditTime: 2020-10-09 10:02:36
 * @FilePath: /ll-web-administration/src/modules/administration/pages/dashboard.vue
-->
<template>
  <div class="dashboard" dashboard>
    <div v-if="isDebug">
      <router-link to="/example/simple">简单页面示例</router-link>
      <router-link to="/example/more/search">更多搜索</router-link>
      <router-link to="/example/more/action">更多按钮</router-link>
    </div>
    <div>
      <router-link to="/approvalType">审批类型</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  created() {},
  data() {
    return {
      isDebug: process.env.NODE_ENV !== 'production'
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard[dashboard] {
}
</style>
