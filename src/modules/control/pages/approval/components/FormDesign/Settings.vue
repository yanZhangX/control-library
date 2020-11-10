<!--
 * @Date: 2020-07-13 14:32:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-10 23:14:20
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/components/FormDesign/Settings.vue
-->
<template>
  <div class="settings">
    <div class="title" v-if="form">{{ form.name }}</div>
    <a-form-model :model="form" :rules="rules" ref="ruleForm" class="form" v-if="form">
      <!-- 标题 -->
      <a-form-model-item v-if="form.title !== undefined && form.title !== null" label="标题" prop="title">
        <a-input v-model="form.title"></a-input>
      </a-form-model-item>
      <!-- 提示文字 -->
      <a-form-model-item :label="createLabel('提示文字', '最多20字')" prop="tips" v-if="form.tips !== undefined && form.tips !== null && form.tag !== 'tooltips'">
        <a-input v-model="form.tips"></a-input>
      </a-form-model-item>
      <!-- 是否必填 -->
      <a-form-model-item label="是否必填" prop="required" v-if="form.required !== undefined && form.required !== null">
        <a-radio-group v-model="form.required">
          <a-radio :value="1">
            是
          </a-radio>
          <a-radio :value="0">
            否
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <!-- 填写字符限制 -->
      <a-form-model-item label="填写字符限制" prop="characterLimit" v-if="form.characterLimit !== undefined && needCharacterLimit.includes(form.tag)">
        <a-input-number :min="0" style="width: 100%;" v-model.number="form.characterLimit"></a-input-number>
      </a-form-model-item>
      <!-- 选项内容 -->
      <a-form-model-item v-model="form.options" :label="createLabel('选项', '选项文本字符最多30')" prop="options" v-if="form.options !== undefined && form.options !== null">
        <div class="optionItem" v-for="(item, index) in form.options" :key="index">
          <a-input :max-length="30" placeholder="请输入选项内容" class="inputArea" :value="item" @change="changeSelectItem($event, index)"></a-input>
          <a-button icon="minus" @click="delSelect(index)"></a-button>
          <a-button icon="plus" type="primary" @click="addSelect(index)"></a-button>
        </div>
      </a-form-model-item>
      <!-- 日期类型 -->
      <a-form-model-item label="日期类型" prop="dateType" v-if="form.dateType !== undefined && form.dateType !== null">
        <a-radio-group v-model="form.dateType">
          <a-radio value="lll">
            年-月-日 时分
          </a-radio>
          <a-radio value="YYYY-MM-DD">
            年-月-日
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <!-- 说明文字 -->
      <a-form-model-item :label="createLabel('说明文字', '最多20字')" prop="tips" v-if="form.tag === 'tooltips'">
        <a-textarea v-model="form.tips" placeholder="请输入说明文字" :maxLength="20"></a-textarea>
      </a-form-model-item>
      <!-- 默认选项个数，资产选择专属 -->
      <!-- <a-form-model-item :label="createLabel('选项个数', '默认5个')" prop="initialNum" v-if="form.tag === 'select'">
        <a-input-number :min="1" style="width: 100%;" v-model="form.initialNum"></a-input-number>
      </a-form-model-item> -->

      <!-- 保存 -->
      <a-form-item>
        <a-button type="primary" @click="save">保存</a-button>
      </a-form-item>
    </a-form-model>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    form: {
      type: Object,
      default() {
        return null
      }
    }
  },

  data() {
    return {
      needCharacterLimit: ['input', 'textarea', 'input-number'],
      rules: {
        optionItem: [
          {
            required: true,
            message: '选项不能为空',
            trigger: 'blur'
          }
        ],
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          },
          {
            message: '最多不超过20字',
            trigger: 'blur',
            max: 20
          }
        ],
        tips: [
          {
            required: true,
            message: '请输入提示文字',
            trigger: 'blur'
          },
          {
            message: '最多不超过20字',
            trigger: 'blur',
            max: 20
          }
        ],
        required: [
          {
            required: true,
            message: '请选择是否必填',
            trigger: 'change'
          }
        ],
        characterLimit: [
          {
            required: true,
            trigger: 'change',
            message: '字符数量限制必填'
          },
          {
            validator: this.checkCharacterLimit,
            trigger: 'blur'
          }
        ],
        initialNum: [
          {
            required: true,
            message: '请设置选项数量',
            trigger: 'blur'
          }
        ],
        options: [
          {
            required: true,
            type: 'array',
            trigger: 'change',
            defaultField: { type: 'string', required: true, message: '选项不能为空' },
            message: '请添加选择项'
          }
        ],
        dateType: [
          {
            required: true,
            message: '请选择日期类型',
            trigger: 'change'
          }
        ],
        tooltips: [
          {
            required: true,
            message: '请输入说明文字',
            trigger: 'blur',
            max: 300,
            type: 'string'
          }
        ],
        field: [
          {
            required: true,
            message: '参数必传且唯一',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    checkCharacterLimit(rule, value, callback) {
      let max = this.form.tag === 'input-number' ? 31 : this.form.tag === 'textarea' ? 201 : 21
      let min = 0
      if (String(value).indexOf('.') > -1) {
        callback(new Error('输入小数无效'))
      }
      if (value < max && value > min) {
        callback()
      } else {
        callback(new Error(`请输入1到${max - 1}之间的数字`))
      }
    },
    // 修改选项内容
    changeSelectItem(e, index) {
      this.form.options[index] = e.target.value
    },
    // 删除选项
    delSelect(index) {
      if (this.form.options.length === 2) {
        this.$message.warning('最少保留两个选项')
        return
      }
      this.form.options.splice(index, 1)
    },
    // 添加选项
    addSelect(index) {
      // let obj = _.cloneDeep(this.form)
      this.form.options.push('默认选项')
    },
    // 保存按钮
    save() {
      let result = new Promise((resolve, reject) => {
        this.validate(resolve, reject)
      })

      result
        .then((res) => {
          this.$emit('saveOptions', _.cloneDeep(res))
          this.$message.success('保存成功')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 渲染label
    createLabel(main, sub) {
      return (
        <span>
          <span class="mainLabel">{main}</span>
          <span class="subLabel">{sub}</span>
        </span>
      )
    },
    // 校验表单
    validate(resovle, reject) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          resovle(this.form)
        } else {
          console.log('error submit!!')
          reject(valid)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  width: 20%;
  min-width: 335px;
  border-left: 1px solid #eee;
  background-color: #fff;
  border-radius: 5px 0px 0px 5px;
  overflow-y: auto;

  .title {
    color: #000000;
    font-size: 16px;
    line-height: 66px;
    border-bottom: 1px solid #eee;
    text-indent: 20px;
  }

  .form {
    padding: 0 20px;
  }

  .subLabel {
    color: #969696;
    font-size: 12px;
    margin-left: 10px;
  }

  .mainLabel {
    color: #000000;
    font-size: 14px;
  }

  .optionItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    .inputArea {
      width: 80%;
    }
  }
}
</style>
