<!--
 * @Date: 2020-07-02 15:44:34
 * @LastEditors: fy
 * @LastEditTime: 2020-10-09 11:05:28
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/components/BreadNav.vue
-->
<template>
  <div class="bread">
    <a-breadcrumb>
      <a-breadcrumb-item>表单设计</a-breadcrumb-item>
      <a-breadcrumb-item v-for="(nav, index) in navLists" :key="index">
        <a @click="handleBack(nav)">{{ nav.label }}</a>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    navLists: {
      type: Array
    }
  },
  methods: {
    handleBack(nav) {
      if (nav.url && this.$route.fullPath !== nav.url) {
        this.$router.back()
      }
    }
  }
}
</script>
<style lang="scss">
.bread {
  height: 53px;
  background: #fff;
  padding: 18px 34px;
  .ant-breadcrumb {
    .ant-breadcrumb-link {
      a {
        color: #4390f7;
      }
    }
  }
  .ant-breadcrumb-separator,
  .ant-breadcrumb > span:last-child {
    a {
      color: #595959;
    }
  }
}
</style>
