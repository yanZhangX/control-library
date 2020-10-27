<!--
 * @Date: 2020-07-13 10:11:30
 * @LastEditors: fy
 * @LastEditTime: 2020-09-29 14:18:55
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/components/FlowDesign/index.vue
-->
<template>
  <div class="flow">
    <div class="scale">
      <a-button icon="minus" @click="scaleDecrease"></a-button>
      <span>{{ scale }}%</span>
      <a-button icon="plus" @click="scaleIncrease"></a-button>
    </div>
    <a-button type="primary" class="btn" @click="goPrev">上一步</a-button>
    <a-button type="primary" class="btn1" @click="createTemp">{{ editorId ? '编辑审批' : '创建审批' }}</a-button>

    <FlowDraw ref="flowDraw" :scale="scale" :data="flow" @add="addNodes" @del="delNodes" @editor="editorNodes"></FlowDraw>
    <FlowControl @up="updateChoose" :tree="treeData" @close="closeDrawer" :source="source" :open="open"></FlowControl>
  </div>
</template>

<script>
import { initData, Utils } from '../../utils/util'
import FlowDraw from './FlowDraw.vue'
import FlowControl from './FlowControl.vue'
import { queryPosition, getTempFlow, getDepartment } from '@/service/approval/index.js'
import cloneDeep from 'lodash/cloneDeep'

export default {
  components: {
    FlowDraw,
    FlowControl
  },
  inject: ['editor'],

  created() {
    this.getTreeData()
    this.getAllDepartment()
    this.editorId = this.editor()
    if (this.editorId) {
      this.getFlow()
    } else {
      this.flow = initData(this.start)
    }
  },
  props: ['start'],
  data() {
    return {
      scale: 100,
      flow: null,
      editorId: null,
      choose: {},
      source: null,
      open: false,
      treeData: [],
      department: {}
    }
  },
  methods: {
    getAllDepartment() {
      getDepartment().then((res) => {
        res.map((item) => {
          let key = item.code[0]
          let val = item.name
          this.department[key] = val
        })
        this.department['all'] = '所有部门'
        this.$forceUpdate()
      })
    },
    // 获取职位
    getTreeData() {
      queryPosition().then((res) => {
        this.treeData = [{ ...res }]
      })
    },
    goPrev() {
      this.$emit('next', 1)
    },
    // 缩放
    scaleIncrease() {
      if (this.scale < 100) {
        this.scale += 5
      }
    },
    // 缩放
    scaleDecrease() {
      if (this.scale > 20) {
        this.scale -= 5
      }
    },
    // 添加节点
    addNodes(type, data) {
      Utils[type](data)
      this.$nextTick(() => {
        this.$refs['flowDraw'].$forceUpdate()
      })
    },
    // 删除节点
    delNodes(data) {
      Utils.delNodes(data, this.flow)
      this.$refs['flowDraw'].$forceUpdate()
    },
    // 编辑节点
    editorNodes(data) {
      let source = cloneDeep(data)

      // 判断类型，条件节点需要特殊处理
      if (source.type === 2) {
        // 如果是条件节点，判断是否有条件，然后初始化添加属性
        if (source.conditionList.length > 0) {
          source.fieldName = source.conditionList[0].field
        } else {
          source.fieldName = ''
        }
      }

      this.open = true
      this.choose = data
      this.source = source
    },
    // 关闭编辑
    closeDrawer() {
      this.choose = {}
      this.source = null
      this.open = false
    },
    // 修改节点
    updateChoose(data) {
      if (this.choose.type === 1) {
        this.choose.postType = data.type
        this.choose.postList = data.arr
        let str = ''
        this.choose.postList.forEach((item) => {
          item.postType = data.type
          str += item.postName ? `${item.postName}、` : `${this.department[item.orders]}、`
        })
        str = str.substr(0, str.length - 1)

        this.choose.statusStr = `待${str}审核`
        this.closeDrawer()
        this.$refs['flowDraw'].$forceUpdate()
      }

      if (this.choose.type === 2) {
        this.choose.conditionList = data.conditionList

        this.closeDrawer()
        this.$refs['flowDraw'].$forceUpdate()
      }

      if (this.choose.type === 0) {
        this.choose.sponsor = data
        this.$emit('changeSponsor', data)
        this.closeDrawer()
        this.$refs['flowDraw'].$forceUpdate()
      }
    },
    // 创建模版
    createTemp() {
      // 遍历 添加level和flowSerialNumber
      Utils.sign(this.flow)
      // 提交事件
      this.$emit('create', this.flow)
    },
    getFlow() {
      getTempFlow({ templateId: this.editorId }).then((res) => {
        let flow = res[0]

        flow.sponsor = this.start
        this.flow = flow
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$head: 125px;
.flow {
  height: calc(100% - #{$head});
  background-color: #fff;
  position: relative;
  padding: 50px;
  text-align: center;
  overflow: auto;

  .scale {
    position: fixed;
    z-index: 999;
    right: 40px;
    top: 200px;
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn {
    position: fixed;
    z-index: 999;
    right: 40px;
    top: 240px;
    width: 120px;
  }

  .btn1 {
    position: fixed;
    z-index: 999;
    right: 40px;
    top: 280px;
    width: 120px;
  }
}
</style>
