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
      <router-link to="/apply">申请</router-link>
      <router-link to="/myApply">我的申请</router-link>
      <router-link to="/approval">会议审批</router-link>
    </div>
    <div>
      <router-link to="/classification">分类管理</router-link>
      <router-link to="/myAssets">我的资产</router-link>
      <router-link to="/useManage">使用管理</router-link>
      <router-link to="/warehouse">仓库管理</router-link>
      <router-link to="/assetPurchase">资产采购</router-link>
    </div>
    <div>
      <router-link to="/approvalType">审批类型</router-link>

      <router-link to="/approvalDataBackend">审批数据-后台维护</router-link>

      <router-link to="/approvalDataManager">审批数据-管理人</router-link>

      <router-link to="/myApproval">我的审批</router-link>
      <router-link to="/myApplyList">我的申请</router-link>
      <router-link to="/superApplyList">我的申请-超管</router-link>

      <router-link to="/superManager">超级管理员</router-link>

      <router-link to="/groupLeader">包量预付群长额度</router-link>
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
