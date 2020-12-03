<template>
  <div class="baseOptions">
    <a-form-model ref="ruleForm" :model="form" layout="vertical" :rules="rules" class="form">
      <!-- 表单名称 -->
      <a-form-model-item label="表单名称:" prop="templateName" :wrapper-col="{ span: 12 }">
        <a-input :maxLength="20" v-model="form.templateName" placeholder="请输入表单名称(最多20字)" />
      </a-form-model-item>
      <!-- icon上传 -->
      <a-form-model-item label="上传图标:" prop="icon" :wrapper-col="{ span: 12 }">
        <a-upload name="file" list-type="picture-card" :show-upload-list="false" :action="uploadImgUrl" :before-upload="beforeUpload" @change="handleChange">
          <img class="icon-url" v-if="form.iconUrl" :src="form.iconUrl" alt="file" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
      </a-form-model-item>
      <!-- 下一步 -->
      <a-form-model-item>
        <a-button type="primary" @click="goFormDesign">下一步</a-button>
      </a-form-model-item>
    </a-form-model>

    <!-- <a-modal class="icon-list" v-model="showIcons" title="选择图标" @ok="chooseImg">
      <div class="box">
        <div @click="chooseIcon(index)" :class="iconIndex === index || form.icon === item ? 'icon-items active' : 'icon-items'" v-for="(item, index) in icons" :key="index">
          <img :src="item" alt="" />
        </div>
      </div>
    </a-modal> -->
  </div>
</template>

<script>
import { formDetailQuery } from '@/service'
import { TreeSelect } from 'ant-design-vue'
import { uploadImgUrl, getBase64 } from '@/util'
import icons from '../utils/icons.js'
import lrz from 'lrz'

const SHOW_PARENT = TreeSelect.SHOW_PARENT
export default {
  data() {
    this.lastFetchId = 0
    return {
      // 表单信息
      form: {
        templateName: undefined,
        iconUrl: undefined
      },
      uploadImgUrl,
      loading: false,
      iconIndex: -1,
      group: [], // 审批类型分组
      data: [], // 查询到的管理员list
      fetching: false,
      closeSelect: false,
      treeData: [],
      icons,
      showIcons: false,
      SHOW_PARENT,
      // 校验规则
      rules: {
        templateName: [{ required: true, message: '请输入表单名称', trigger: 'blur' }]
        // examine: [{ required: true, message: '请选择是否允许修改', trigger: 'blur' }]
      },
      editorId: null,
      sequence: null
    }
  },
  inject: ['editor'],
  created() {
    this.editorId = this.editor()
    if (this.editorId) {
      this.getTemplate()
    }
  },

  methods: {
    chooseIcon(index) {
      this.iconIndex = index
    },
    chooseImg() {
      if (this.iconIndex > -1) {
        this.form.icon = this.icons[this.iconIndex]
      }
      this.showIcons = false
    },
    goFormDesign() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('base', this.form)
          this.$emit('next', 1)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
        console.log(response)
        if (response) {
          this.form.iconUrl = response.data
        } else {
          getBase64(file.originFileObj, (imageUrl) => {
            this.form.iconUrl = imageUrl
          })
        }
        this.loading = false
      }
    },
    // 编辑状态下，获取base
    getTemplate() {
      formDetailQuery({ templateId: this.editorId }).then((res) => {
        const { templateName, iconUrl } = res.data
        this.form = {
          templateName,
          iconUrl
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$head: 125px;
.baseOptions {
  background-color: #fff;
  height: calc(100% - #{$head});
  overflow-y: auto;

  .form {
    width: 600px;
    margin: 0 auto;
    padding: 50px 0;
  }
  .icon-url {
    max-width: 200px;
  }
}

.icon-list {
  .box {
    width: 100%;
    height: 200px;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;

    .icon-items {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
    }

    .active {
      border-color: cornflowerblue;
    }
  }
}
</style>
