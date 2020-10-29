<!--
 * @Date: 2020-07-03 10:20:38
 * @LastEditors: fy
 * @LastEditTime: 2020-09-24 14:16:19
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/approvalType/createNew.vue
-->
<template>
  <div class="create">
    <BreadNav
      :navLists="[
        { label: '审批类型', url: '/approvalType' },
        { label: '创建新审批', url: $route.fullPath }
      ]"
    ></BreadNav>
    <Steps :progress="progress" :current="current"></Steps>

    <keep-alive>
      <!-- <BaseOptions @base="saveBase" @next="changeCurrent" v-if="current === 0"></BaseOptions> -->
      <FormDesign @comps="saveComps" @next="changeCurrent" v-if="current === 1"></FormDesign>
    </keep-alive>
    <!-- <FlowDesign @changeSponsor="changeSponsor" @create="createTemp" @next="changeCurrent" :start="base.sponsor" v-if="current === 2"></FlowDesign> -->
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import Steps from '../components/Steps.vue'
import BaseOptions from '../components/BaseOptions.vue'
import FlowDesign from '../components/FlowDesign'
import FormDesign from '../components/FormDesign'
import { createApprover, editorApprover } from '@/service/approval/index.js'
import { Utils } from '../utils/util'
import BreadNav from '../components/BreadNav.vue'

export default {
  components: {
    Steps,
    FlowDesign,
    FormDesign,
    BaseOptions,
    BreadNav
  },
  provide: function() {
    return {
      fields: () => this.fields,
      editor: () => this.editorId
    }
  },
  data() {
    return {
      progress: [
        // {
        //   title: '基础设置'
        // },
        {
          title: '表单设计'
        }
        // {
        //   title: '审批流程设计'
        // }
      ],
      current: 1,
      base: null,

      fields: [],
      comps: null,
      editorId: null
    }
  },
  created() {
    if (this.$route.query.id) {
      this.editorId = this.$route.query.id
    }
  },
  methods: {
    changeSponsor(data) {
      this.base.sponsor = data
    },
    changeCurrent(params) {
      this.current = params
    },
    saveBase(data) {
      let obj = cloneDeep(data)

      let arr = obj.custodian.map((item) => {
        return {
          id: item.split(':')[0],
          name: item.split(':')[1]
        }
      })
      obj.custodian = arr
      this.base = obj
    },
    saveComps(data) {
      // 至少有一个为必填
      if (!Utils.checkRequired(data)) {
        this.$messageSend.warning('必须至少包含一个必填项')
        return
      }
      // 最多只能有一个附件上传
      let num = 0
      data.forEach((item) => {
        if (item.tag === 'file') {
          num++
        }
      })
      if (num > 1) {
        this.$messageSend.warning('只能包含一个附件上传')
        return
      }
      this.fields = []
      data.forEach((item, index) => {
        if (item.tag === 'assets') {
          item.field = 'asset'
        } else if (item.tag === 'file') {
          item.field = 'fileUpload'
        } else if (item.tag === 'assetReturn') {
          item.field = 'assetReturn'
        } else {
          item.field = `${item.tag}${index}`
        }
        if (item.tag === 'input-number') {
          this.fields.push(`${item.title}-${item.field}`)
        }
      })
      this.comps = data
      console.log(data)
      //   this.current = 2
    },
    createTemp(data) {
      if (Utils.checkEmpty(data)) {
        this.$messageSend.warning('请将节点信息补充完整')
        return
      }
      this.$delete(this.base, 'sponsorShow')
      this.comps.forEach((item) => {
        if (item.options && item.options.length > 0) {
          item.options = typeof item.options === 'string' ? item.options : JSON.stringify(item.options)
        }
      })

      let templateAddReq = {
        addControlList: this.comps,
        templateReq: this.base,
        workFlowReq: cloneDeep(data)
      }
      delete templateAddReq.workFlowReq.sponsor

      if (this.editorId) {
        editorApprover(templateAddReq).then((res) => {
          if (res === 1001) {
            return
          }
          this.$router.push({ path: '/approvalType' })
        })
      } else {
        createApprover(templateAddReq).then((res) => {
          if (res === 1001) {
            return
          }
          this.$router.push({ path: '/approvalType' })
        })
      }
    }
  }
}
</script>

<style></style>
