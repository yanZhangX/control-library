<!--
 * @Date: 2020-07-03 10:20:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-29 16:39:30
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/approvalType/createNew.vue
-->
<template>
  <div class="create">
    <BreadNav :navLists="[{ label: '控件库', url: $route.fullPath }]"></BreadNav>
    <!-- <Steps :progress="progress" :current="current"></Steps> -->
    <a-form-model ref="ruleForm" :model="base" layout="vertical" :rules="rules" class="form">
      <!-- 审批名称 -->
      <a-form-model-item label="表单名称:" prop="templateName" :wrapper-col="{ span: 12 }">
        <a-input :maxLength="20" v-model="base.templateName" placeholder="请输入表单名称(最多20字)" />
      </a-form-model-item>
      <!-- icon上传 -->
      <a-form-model-item label="上传图标:" prop="icon" :wrapper-col="{ span: 12 }">
        <a-upload name="file" list-type="picture-card" :show-upload-list="false" :action="uploadImgUrl" :before-upload="beforeUpload" @change="handleChange">
          <img v-if="base.iconUrl" :src="base.iconUrl" alt="file" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
      </a-form-model-item>
    </a-form-model>
    <keep-alive>
      <!-- <BaseOptions @base="saveBase" @next="changeCurrent" v-if="current === 0"></BaseOptions> -->
      <FormDesign @comps="saveComps" @next="changeCurrent" @getTemplateName="getTemplateName" v-if="current === 1"></FormDesign>
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
import { formInsert, formUpdate } from '@/service'
import { uploadImgUrl, getBase64 } from '@/util'
import { Utils } from '../utils/util'
import BreadNav from '../components/BreadNav.vue'
import lrz from 'lrz'

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
      editor: () => this.templateId
    }
  },
  data() {
    return {
      uploadImgUrl,
      progress: [
        {
          title: '基础设置'
        },
        {
          title: '表单设计'
        }
      ],
      current: 1,
      base: {},

      fields: [],
      comps: null,
      templateId: null,
      rules: {
        templateName: [{ required: true, message: '请输入表单名称', trigger: 'blur' }]
        // examine: [{ required: true, message: '请选择是否允许修改', trigger: 'blur' }]
      },
      loading: false
    }
  },
  created() {
    if (this.$route.query.templateId) {
      this.templateId = this.$route.query.templateId
    }
  },
  methods: {
    changeSponsor(data) {
      this.base.sponsor = data
    },
    changeCurrent(params) {
      this.current = params
    },
    getTemplateName(name) {
      console.log(name)
      this.$set(this.base, 'templateName', name)
      //   this.base.templateName = name
      //   console.log(this.base)
    },
    saveBase(data) {
      let obj = cloneDeep(data)
      this.base = obj
    },
    saveComps(data) {
      // 至少有一个为必填
      if (!Utils.checkRequired(data)) {
        this.$message.warning('必须至少包含一个必填项')
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
        this.$message.warning('只能包含一个附件上传')
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
          item.control_id = index + 1
        }
        if (item.tag === 'input-number') {
          this.fields.push(`${item.title}-${item.field}`)
        }
      })
      this.comps = data
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.addForm()
        } else {
          return false
        }
      })
      //   this.current = 2
    },
    addForm() {
      const { base, comps, templateId } = this
      let params = {
        ...base,
        data: comps
      }
      if (comps[0].id) {
        params.templateId = templateId
        formUpdate(params).then((res) => {
          this.$message.success('修改成功')
          this.$router.go(-1)
        })
      } else {
        formInsert(params).then((res) => {
          this.$message.success('创建成功')
          this.$router.go(-1)
        })
      }
    },
    // createTemp(data) {
    //   if (Utils.checkEmpty(data)) {
    //     this.$message.warning('请将节点信息补充完整')
    //     return
    //   }
    //   this.$delete(this.base, 'sponsorShow')
    //   this.comps.forEach((item) => {
    //     if (item.options && item.options.length > 0) {
    //       item.options = typeof item.options === 'string' ? item.options : JSON.stringify(item.options)
    //     }
    //   })

    //   let templateAddReq = {
    //     addControlList: this.comps,
    //     templateReq: this.base,
    //     workFlowReq: cloneDeep(data)
    //   }
    //   delete templateAddReq.workFlowReq.sponsor

    //   if (this.templateId) {
    //     editorApprover(templateAddReq).then((res) => {
    //       if (res === 1001) {
    //         return
    //       }
    //       this.$router.push({ path: '/approvalType' })
    //     })
    //   } else {
    //     createApprover(templateAddReq).then((res) => {
    //       if (res === 1001) {
    //         return
    //       }
    //       this.$router.push({ path: '/approvalType' })
    //     })
    //   }
    // }
    // 压缩图片
    beforeUpload(file) {
      const limit = 1.8 * 1024 * 1024 // 图片限制1.8M 1.8 * 1024 * 1024
      if (file && file.size > limit) {
        lrz(file)
          .then((res) => {
            let file = new File([res.file], res.origin.name, { type: res.file.type })
            file.uid = res.origin.uid
            return file
          })
          .catch((e) => {
            console.log('压缩失败')
          })
      } else {
        return file
      }
      return file
    },
    handleCancel() {
      this.previewVisible = false
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    },
    handleChange({ file }) {
      const { response } = file
      if (file.status === 'uploading') {
        this.loading = true
        return
      }
      if (file.status === 'done') {
        // Get this url from response in real world.
        if (response) {
          this.base.iconUrl = response.body.data
        } else {
          getBase64(file.originFileObj, (imageUrl) => {
            this.base.iconUrl = imageUrl
            this.loading = false
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  padding-left: 20px;
}
</style>
