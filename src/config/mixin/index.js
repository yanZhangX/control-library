import style from '../../../src/assets/style/global.scss'
let pagingHeight = 50 // 默认分页器高度
try {
  if (style && style.pagingHeight) {
    pagingHeight = parseInt(style.pagingHeight) || 0
  }
} catch (e) {}

export const mainMixin = {
  data() {
    return {
      tableHeight: 500
    }
  },
  mounted() {
    const el = this.$el
    if (!el || !el.querySelector) return
    const ref = el.querySelector('.main-body')
    if (!ref) return
    const windowHeight = window.document.documentElement.clientHeight
    this.tableHeight = windowHeight - (ref.offsetTop - el.offsetTop) - pagingHeight - 60 // 表头60
  },
  created() {
    // if (this.$route.query.query) {
    //   this.query = JSON.parse(this.$route.query.query)
    // }
  },
  // watch: {
  //   query: {
  //     deep: true,
  //     handler(newValue, oldValue) {
  //       let query = JSON.stringify(newValue)
  //       this.$router.replace({
  //         path: this.$route.path,
  //         query: { query }
  //       })
  //     }
  //   }
  // },
  methods: {
    handleItemRender(current, type, originalElement) {
      let pageNum = Number(this.query.pageNum)
      let pageSize = Number(this.query.pageSize)
      if (type === 'prev') {
        if (pageNum === 1) {
          return (
            <a class="page-item">
              <a-icon type="caret-left" style="fontSize: 14px; color: '#cbcbcb'" />
            </a>
          )
        }
        return (
          <a class="page-item">
            <a-icon type="caret-left" style="fontSize: 14px; color: '#cbcbcb'" />
            <span>上一页</span>
          </a>
        )
      } else if (type === 'next') {
        if (pageNum === Math.ceil(this.total / pageSize)) {
          return (
            <a class="page-item">
              <a-icon type="caret-right" style="fontSize: 14px; color: '#cbcbcb'" />
            </a>
          )
        }
        return (
          <a class="page-item">
            <span>下一页</span>
            <a-icon type="caret-right" style="fontSize: 14px; color: '#cbcbcb'" />
          </a>
        )
      }
      return originalElement
    },
    transformCell({ text, column, record, index }) {
      if (text === undefined || text === null || text === '') {
        return (text = '无')
      }
      return text
    }
  }
}
