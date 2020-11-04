<template>
  <div class="baseOptions">
    <a-form-model ref="ruleForm" :model="form" layout="vertical" :rules="rules" class="form">
      <!-- 审批名称 -->
      <a-form-model-item label="审批名称:" prop="template_name">
        <a-input :maxLength="20" v-model="form.template_name" placeholder="请输入审批名称(最多20字)" />
      </a-form-model-item>
      <!-- 是否允许修改 -->
      <a-form-model-item label="是否允许修改:" prop="examine">
        <a-radio-group v-model="form.examine">
          <a-radio :value="0">
            否
          </a-radio>
          <a-radio :value="1">
            是
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <!-- 发起人类型 -->
      <!-- <a-form-model-item label="谁可以发起这个审批(谁可以看到此审批类型):" prop="sponsorShow">
        <a-tree-select :label-in-value="true" v-model="form.sponsorShow" style="width: 100%" :tree-data="treeData" tree-checkable :show-checked-strategy="SHOW_PARENT" placeholder="选择发起人" />
      </a-form-model-item> -->
      <!-- 管理 -->
      <!-- <a-form-model-item label="谁可以管理这个模版的数据:" prop="custodian">
        <a-select mode="multiple" v-model="form.custodian" placeholder="选择管理员" :filter-option="false" :not-found-content="fetching ? undefined : null" @search="handleSearch">
          <a-spin v-if="fetching" slot="notFoundContent" size="small" />
          <a-select-option v-for="d in data" :key="d.userId + ':' + d.userName">
            {{ d.userName }}
          </a-select-option>
        </a-select>
      </a-form-model-item> -->
      <!-- 图标 -->
      <!-- <a-form-model-item label="图标:" prop="icon">
        <div>
          <img :src="form.icon" alt />
          <a-button type="primary" @click="showIcons = true">选择图标</a-button>
        </div>
      </a-form-model-item> -->
      <!-- 备注 -->
      <!-- <a-form-model-item label="备注(最多20字):">
        <a-input :maxLength="20" v-model="form.remark" type="textarea" />
      </a-form-model-item> -->
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
import debounce from 'lodash/debounce'
import { queryUser, queryApprovalGroup, queryPosition, getTempBase } from '@/service/approval/index.js'
import { TreeSelect } from 'ant-design-vue'
import icons from '../utils/icons.js'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
export default {
  data() {
    this.lastFetchId = 0
    this.handleSearch = debounce(this.handleSearch, 800)
    return {
      // 表单信息
      form: {
        template_name: undefined,
        examine: undefined
      },
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
        template_name: [{ required: true, message: '请输入审批名称', trigger: 'blur' }],
        examine: [{ required: true, message: '请选择是否允许修改', trigger: 'blur' }]
      },
      editorId: null,
      sequence: null
    }
  },
  inject: ['editor'],
  created() {
    this.getTypes()
    this.getPosition()
    this.editorId = this.editor()
    if (this.editorId) {
      this.getTemp()
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
    // 获取职位
    getPosition() {
      queryPosition().then((res) => {
        this.treeData = [{ ...res }]
      })
    },
    // 获取模版类型
    getTypes() {
      queryApprovalGroup().then((res) => {
        this.group = res.ApprovalGroupList.filter((item) => item.name !== '停用')
      })
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

    handleSearch(e) {
      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      this.data = []
      this.fetching = true
      queryUser({ keywords: e }).then((res) => {
        if (fetchId !== this.lastFetchId) {
          return
        }
        this.data = res.records
        this.fetching = false
      })
    },
    // 编辑状态下，获取base
    getTemp() {
      getTempBase({ templateId: this.editorId }).then((res) => {
        Object.keys(this.form).map((key) => {
          this.form[key] = res[key]
        })
        this.form.sponsorShow = this.form.sponsor.map((item) => {
          if (item.name) {
            return {
              value: `${item.name}-${item.orders}`
            }
          } else {
            return { value: `${item.orders}` }
          }
        })

        this.form.sponsor = []

        this.form.custodian = this.form.custodian.map((item) => {
          return `${item.relatedId}:${item.relatedName}`
        })

        this.sequence = res.sequence
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
