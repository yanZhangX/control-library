<!--
 * @Author: your name
 * @Date: 2020-11-02 23:12:32
 * @LastEditTime: 2020-11-03 21:58:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-library\src\modules\control\pages\formList\formDetail.vue
-->
<template>
  <div class="form-detail_main">
    <div class="breadcrumb-container">
      <a-breadcrumb separator="/">
        <a-breadcrumb-item>控件库</a-breadcrumb-item>
        <a-breadcrumb-item href="/formList">表单列表</a-breadcrumb-item>
        <a-breadcrumb-item>表单详情</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <card title="申请信息" :border="false">
      <div slot="container">
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">申请时间</a-col>
          <a-col :span="6">2020/06/20</a-col>
        </a-row>
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">申请单编号</a-col>
          <a-col :span="6">1321534564654156351</a-col>
        </a-row>
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">申请人</a-col>
          <a-col :span="6">貂蝉</a-col>
        </a-row>
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">所属公司</a-col>
          <a-col :span="6">成都分公司</a-col>
        </a-row>
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">所属部门</a-col>
          <a-col :span="6">销售部</a-col>
        </a-row>
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">发票抬头</a-col>
          <a-col :span="6">4694535132132132132</a-col>
        </a-row>
        <a-row class="apply-info_main">
          <a-col :span="1" class="apply-title_item">税号</a-col>
          <a-col :span="6">6565645454151515</a-col>
        </a-row>
      </div>
    </card>
  </div>
</template>

<script>
import { Card } from '@/components'
import { formDetailQuery } from '@/service'
export default {
  name: 'formDetail',
  components: { Card },
  data() {
    return {
      templateId: null,
      formDetail: {},
      total: 0,
      loading: false
    }
  },
  methods: {
    // 分配穿梭框表格分页数据
    queryFormDetail() {
      const { templateId } = this
      formDetailQuery({ templateid: templateId }).then((res) => {
        this.formDetail = res
      })
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
}
</style>
