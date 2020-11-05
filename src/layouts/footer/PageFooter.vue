<!--
 * @Author: your name
 * @Date: 2020-11-05 23:22:00
 * @LastEditTime: 2020-11-05 23:49:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \control-library\src\layouts\footer\PageFooter.vue
-->
<template>
  <div class="footer">
    <div class="links">
      <a target="_blank" :key="index" :href="item.link ? item.link : 'javascript: void(0)'" v-for="(item, index) in linkList"> <a-icon v-if="item.icon" :type="item.icon" />{{ item.name }} </a>
    </div>
    <div class="copyright">Copyright<a-icon type="copyright" />{{ copyright }}</div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: ['copyright', 'linkList']
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 48px 16px 24px;
  /*margin: 48px 0 24px;*/
  text-align: center;
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  .links {
    margin-bottom: 8px;
    a:not(:last-child) {
      margin-right: 40px;
    }
    a {
      color: rgba(0, 0, 0, 0.45);
      -webkit-transition: all 0.3s;
      transition: all 0.3s;
    }
  }
}
</style>
