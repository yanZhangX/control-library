<!--
 * @Date: 2020-07-13 10:11:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-08 23:07:06
 * @FilePath: /control-library/src/modules/administration/pages/approval/components/FormDesign/index.vue
-->
<template>
  <div class="formDesign">
    <section class="left-bar">
      <div class="title">
        <span class="left-border"></span>
        <span>控件库</span>
      </div>
      <draggable :sort="false" :list="compList" class="drag-area" :group="{ name: 'people', pull: 'clone', put: false }">
        <Comps v-for="(item, index) in compList" :key="index" :data="item"></Comps>
      </draggable>
    </section>
    <section class="content-bar">
      <Container ref="content" @delete="del" @sortList="sortList" @choosed="chooseChange" :list="list" :choosed="choosed"></Container>
      <div class="next">
        <!-- <a-button type="primary" @click="goPrev">上一步</a-button> -->
        <a-button type="primary" @click="next">保存</a-button>
      </div>
    </section>
    <Settings @saveOptions="saveOptions" ref="setting" :form="form"></Settings>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Settings from './Settings.vue'
import Comps from './Comps.vue'
import Container from './Container.vue'
import List from '../../utils/comps.js'
import _ from 'lodash'
import { getTempComps } from '@/service/approval/index.js'

export default {
  components: {
    Settings,
    draggable,
    Container,
    Comps
  },
  data() {
    return {
      compList: List,
      list: [],
      form: null,
      choosed: -1,
      editorId: null
    }
  },
  inject: ['editor'],
  created() {
    this.editorId = this.editor()
    if (this.editorId) {
      this.getTemp()
    }
  },
  activated() {
    console.log('activated')
  },
  methods: {
    // 下一步
    next() {
      // 没拖拽组件进去
      if (!this.list.length) {
        this.$message.warning('表单内容不能为空')
        return
      }

      // 拖拽了 全是默认
      if (this.list.length > 0 && this.choosed === -1) {
        this.$emit('comps', this.list)
        return
      }
      // 拖拽并且选择了
      this.validateForm()
        .then((res) => {
          this.$emit('comps', this.list)
        })
        .catch((err) => {
          this.$message.warning('请将内容补充完整')
          console.log(err)
        })
    },

    goPrev() {
      this.$emit('next', 0)
    },
    // 删除
    del(index) {
      this.form = null
      let arr = [...this.list]
      arr.splice(index, 1)
      this.list = arr
      this.choosed = -1
    },
    // 保存
    saveOptions(val) {
      this.list[this.choosed] = _.cloneDeep(val)
      console.log(val)
      this.$refs.content.$forceUpdate()
    },
    // 选中的预览中组件改变
    chooseChange(index) {
      // 如果当前没选中的，就直接选中切换
      if (this.choosed === -1) {
        this.form = _.cloneDeep(this.list[index])
        this.choosed = index
        return
      }
      // 判断当前的是否填完,如果没填完，不进行切换；如果填完了，自动保存，然后切换
      this.validateForm()
        .then((res) => {
          // 保存
          this.saveOptions(res)
          // 切换
          this.choosed = index
          this.form = _.cloneDeep(this.list[index])
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 验证表单，返回验证结果
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.setting.validate(resolve, reject)
      })
    },
    // 给list排序
    sortList(e) {
      if (e.added) {
        this.addSort(e)
      }

      if (e.moved) {
        this.moveSort(e)
      }
    },
    addSort(e) {
      let { newIndex } = e.added
      if (newIndex <= this.choosed) {
        this.choosed++
      }
      this.list = _.cloneDeep(this.list)
    },
    moveSort(e) {
      let { oldIndex, newIndex } = e.moved
      if (oldIndex === this.choosed) {
        this.choosed = newIndex
      } else {
        if (oldIndex > this.choosed && newIndex <= this.choosed) {
          this.choosed++
        }
        if (oldIndex < this.choosed && newIndex >= this.choosed) {
          this.choosed--
        }
      }
    },
    getTemp() {
      getTempComps({ templateId: this.editorId }).then((res) => {
        this.list = res
        this.list.forEach((item) => {
          if (item.options && item.options.length > 0) {
            item.options = JSON.parse(item.options)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$head: 147px;
.formDesign {
  height: calc(100% - #{$head});
  overflow-y: auto;
  display: flex;

  .left-bar {
    width: 20%;
    min-width: 335px;
    padding: 25px 20px;
    background-color: #fff;
    border-radius: 5px;

    .title {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      color: #000000;

      .left-border {
        width: 4px;
        height: 18px;
        background-color: #4c84ff;
        border-radius: 2px;
        margin-right: 14px;
      }
    }

    .drag-area {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }

  .content-bar {
    flex: 1;

    .next {
      margin: 0 auto;
      display: block;
      text-align: center;
    }
  }
}
</style>
