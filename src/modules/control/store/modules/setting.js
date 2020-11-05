/*
 * @Author: xiangty
 * @Date: 2020-11-05 23:30:36
 * @LastEditTime: 2020-11-06 00:01:54
 * @LastEditors: Please set LastEditors
 * @Description: 设置
 * @FilePath: \control-library\src\modules\control\store\modules\setting.js
 */
import config from '@/config'

export default {
  namespaced: true,
  state: {
    isMobile: false,
    pageMinHeight: 0,
    menuData: [],
    activatedFirst: undefined,
    ...config
  },
  mutations: {
    setDevice(state, isMobile) {
      state.isMobile = isMobile
    },
    setTheme(state, theme) {
      state.theme = theme
    },
    setLayout(state, layout) {
      state.layout = layout
    },
    setMultiPage(state, multiPage) {
      state.multiPage = multiPage
    },
    setAnimate(state, animate) {
      state.animate = animate
    },
    setWeekMode(state, weekMode) {
      state.weekMode = weekMode
    },
    setFixedHeader(state, fixedHeader) {
      state.fixedHeader = fixedHeader
    },
    setFixedSideBar(state, fixedSideBar) {
      state.fixedSideBar = fixedSideBar
    },
    setLang(state, lang) {
      state.lang = lang
    },
    setHideSetting(state, hideSetting) {
      state.hideSetting = hideSetting
    },
    correctPageMinHeight(state, minHeight) {
      state.pageMinHeight += minHeight
    },
    setMenuData(state, menuData) {
      state.menuData = menuData
    },
    setAsyncRoutes(state, asyncRoutes) {
      state.asyncRoutes = asyncRoutes
    },
    setPageWidth(state, pageWidth) {
      state.pageWidth = pageWidth
    },
    setActivatedFirst(state, activatedFirst) {
      state.activatedFirst = activatedFirst
    },
    setFixedTabs(state, fixedTabs) {
      state.fixedTabs = fixedTabs
    }
  }
}
