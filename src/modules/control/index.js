import Vue from 'vue'
import App from './App'
import router from './router'
import Antd from 'ant-design-vue'
import '../../assets/style/global.scss'
import '../../assets/style/theme.scss'
import '../../assets/style/antd.less'
import { mainMixin } from '@/config/mixin'
import plugin from '@/config/plugin' // 自定义插件
import { BreadNav } from '@/components'
import '@/filter'
Vue.mixin(mainMixin)
// import axios from 'axios'

Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(plugin)
// Vue.use(axios)
Vue.component('breadNav', BreadNav)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
