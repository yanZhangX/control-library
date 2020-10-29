/*
 * @Date: 2020-07-14 14:52:38
 * @LastEditors: fy
 * @LastEditTime: 2020-09-11 14:50:59
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/utils/comps.js
 */

const list = [
  // 单行输入框
  {
    // 组件标签
    tag: 'input',
    // 组件名
    name: '单行输入框',
    // 是否必填
    required: 1,
    // 标题
    title: '单行输入框',
    // 提示
    tips: '请输入',
    // 长度限制
    characterLimit: 20,
    // 参数名
    field: undefined
  },
  // 多行输入框
  {
    tag: 'textarea',
    name: '多行输入框',
    required: 1,
    title: '多行输入框',
    tips: '请输入',
    characterLimit: 200,
    field: undefined
  },
  // 数字输入框
  {
    tag: 'input-number',
    name: '数字输入框',
    required: 1,
    title: '数字输入框',
    tips: '请输入',
    characterLimit: 30,
    field: undefined
  },
  // 单选框
  {
    tag: 'radio',
    name: '单选框',
    required: 1,
    title: '单选框',
    field: undefined,
    // 选项列表
    options: ['选项1', '选项2']
  },
  // 多选框
  {
    tag: 'radio-group',
    name: '多选框',
    required: 1,
    title: '多选框',
    filed: undefined,
    // 选项列表
    options: ['选项1', '选项2', '选项3']
  },
  // 日期
  {
    tag: 'date',
    name: '日期',
    required: 1,
    title: '日期',
    field: undefined,
    dateType: 'YYYY-MM-DD' // 默认，可选yyyy-mm-dd hh-mm
  },
  // 日期区间
  {
    tag: 'range-date',
    name: '日期区间',
    required: 1,
    title: '日期区间',
    field: undefined,
    dateType: 'YYYY-MM-DD' // 默认，可选yyyy-mm-dd hh-mm
  },
  // 图片
  {
    tag: 'pic',
    name: '图片',
    required: 1,
    title: '图片上传',
    tips: '请上传图片，最大不超过2M',
    filed: undefined
  },
  // 说明文字
  {
    tag: 'tooltips',
    name: '说明文字',
    title: '说明文字',
    tips: '请输入说明文字',
    field: undefined
  },
  // 附件
  {
    tag: 'file',
    name: '附件',
    required: 1,
    title: '附件上传',
    tips: '请上传附件,支持pdf、doc、xls',
    field: undefined
  },
  // 省市区
  {
    tag: 'address',
    name: '省市区',
    required: 1,
    title: '选择省市区',
    tips: '请选择',
    field: undefined
  },
//   选择同事
    {
      tag: 'mates',
      name: '选择同事',
      required: 1,
      title: '选择同事',
      tips: '请选择',
      field: undefined
    },
    // 资产选择
    {
      tag: 'assets',
      name: '资产选择',
      required: 1,
      title: '资产选择',
      tips: '请选择',
      initialNum: 5 // 默认可选项数
    },
    // 资产归还
    {
      tag: 'assetReturn',
      name: '资产归还',
      title: '资产归还',
      required: 1,
      field: undefined
    }
]

export default list
