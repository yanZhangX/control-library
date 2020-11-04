<!--
 * @Description: 面包屑
 * @Author: xiangty
 * @Date: 2020-04-07 09:38:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-04 21:35:15
 -->
<template>
  <div class="breadcrumb-container">
    <a-breadcrumb>
      <a-breadcrumb-item>一级</a-breadcrumb-item>
      <a-breadcrumb-item>二级</a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    root: {
      default: '',
      type: String
    },
    navLists: {
      type: Array
    }
  }
}
</script>
<style lang="scss">
.bread {
}
</style>
