<!--
 * @Author: xiangty
 * @Date: 2020-11-02 23:12:32
 * @LastEditTime: 2020-11-10 23:56:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-library\src\modules\control\pages\formList\formDetail.vue
-->
<template>
  <div class="form-detail_main">
    <div class="breadcrumb-container">
      <a-breadcrumb separator="/">
        <a-breadcrumb-item>控件库</a-breadcrumb-item>
        <a-breadcrumb-item @click.native="backList" class="back">表单列表</a-breadcrumb-item>
        <a-breadcrumb-item>表单详情</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <Card title="表单信息" :border="false">
      <div slot="container">
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">模板名称</a-col>
          <a-col :span="6">{{ formDetail.templateName }}</a-col>
        </a-row>
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">创建人</a-col>
          <a-col :span="6">{{ formDetail.createR }}</a-col>
        </a-row>
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">创建时间</a-col>
          <a-col :span="6">{{ formDetail.createTime }}</a-col>
        </a-row>
        <a-table :columns="columns" :pagination="false" :dataSource="formDetail.templateDetailList" rowKey="templateId" tableLayout="fixed" :scroll="{ x: 1200 }" :loading="loading">
          <template slot="action" slot-scope="row">
            <a @click="toDetail(row)">详情</a>
            <a>编辑</a>
          </template>
        </a-table>
      </div>
    </Card>
  </div>
</template>

<script>
import { Card } from '@/components'
import { formDetailQuery } from '@/service'
const columns = Object.freeze([
  { title: '控件标题', width: 180, dataIndex: 'title', ellipsis: true },
  { title: '是否必填', width: 120, dataIndex: 'required', ellipsis: true, customRender: (text) => (text === 0 ? '非必填' : '必填') },
  { title: '提示文字', width: 120, dataIndex: 'tips', ellipsis: true },
  { title: '限制长度', width: 80, dataIndex: 'characterLimit', ellipsis: true }
])
export default {
  name: 'formDetail',
  components: { Card },
  data() {
    return {
      templateId: null,
      formDetail: {},
      total: 0,
      loading: false,
      columns
    }
  },
  methods: {
    // 分配穿梭框表格分页数据
    queryFormDetail() {
      const { templateId } = this
      formDetailQuery({ templateId }).then((res) => {
        const { data } = res
        this.formDetail = data
      })
    },
    backList() {
      this.$router.go(-1)
    }
  },
  created() {
    const { templateId } = this.$route.query
    this.templateId = templateId
    this.queryFormDetail()
  }
}
</script>

<style lang="scss" scoped>
.form-detail_main {
  height: auto !important;
  min-height: 100%;
  background-color: #fff;
  .apply-info_main {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .apply-title_item {
    margin-right: 32px;
    text-align: right;
  }
  .form-table_main {
    padding-left: 40px;
    width: 1000px;
  }
  .back {
    cursor: pointer;
    &:hover {
      color: $color-main;
    }
  }
}
</style>
