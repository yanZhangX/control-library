/*
 * @Author: xiangty
 * @Date: 2020-10-26 22:12:38
 * @LastEditTime: 2020-11-05 23:46:30
 * @LastEditors: Please set LastEditors
 * @Description: 入口
 * @FilePath: \control-library\src\modules\control\index.js
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import VueClipboard from 'vue-clipboard2'
import '../../assets/style/global.scss'
import '../../assets/style/theme.scss'
import '../../assets/style/antd.less'
import { mainMixin } from '@/config/mixin'
import plugin from '@/config/plugin' // 自定义插件
import { BreadNav } from '@/components'
import store from './store'
import '@/filter'
Vue.mixin(mainMixin)
// import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(plugin)
Vue.use(VueClipboard)
// Vue.use(axios)
Vue.component('breadNav', BreadNav)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App)
})
