<!--
 * @Author: your name
 * @Date: 2020-10-26 22:12:38
 * @LastEditTime: 2020-12-03 23:22:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-library\src\modules\control\App.vue
-->
<template>
  <a-config-provider :locale="zhCN" style="height: 100%;" :transformCellText="transformCell">
    <router-view />
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
export default {
  name: 'App',
  data() {
    return {
      zhCN
    }
  }
}
</script>

<style lang="scss">
html {
  width: 100vw;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #eef1f6 !important;
  word-break: break-all;
}
</style>
