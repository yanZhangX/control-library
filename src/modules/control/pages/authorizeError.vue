<!--
 * @Author:xiangty
 * @Date: 2020-11-04 21:30:00
 * @LastEditTime: 2020-11-04 21:37:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-library\src\modules\control\pages\authorizeError.vue
-->
<template>
  <div class="error-page">
    <img src="@/assets/img/404.png" />
    <div class="error-text">
      <div>出错啦，您没有权限访问，请联系管理员</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'authorizeError',
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.error-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin-top: -250px;
    width: 24%;
    height: 35%;
  }
  .error-text {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
