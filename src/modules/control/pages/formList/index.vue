<!--
 * @Author: xiangty
 * @Date: 2020-11-02 21:44:26
 * @LastEditTime: 2020-11-10 23:59:14
 * @LastEditors: Please set LastEditors
 * @Description: 表单列表
 * @FilePath: \control-library\src\modules\control\pages\formList\index.vue
-->
<template>
  <div class="form-list" formList>
    <div class="breadcrumb-container">
      <a-breadcrumb separator="/">
        <a-breadcrumb-item>控件库</a-breadcrumb-item>
        <a-breadcrumb-item>表单列表</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <TableFilter :filters="formFilters">
      <a-input class="filter-input" slot="templateName" type="text" v-model="query.templateName" allowClear />
      <template slot="filterOptions">
        <a-button type="primary" @click="statusChange">搜索</a-button>
        <a-button @click="statusRest">重置</a-button>
        <a-button type="primary" @click="creatNewForm">创建表单模板</a-button>
      </template>
    </TableFilter>
    <div class="main-container">
      <!--主体部分 -->
      <div class="main-body">
        <a-table :columns="columns" :pagination="false" :dataSource="formList" rowKey="templateId" tableLayout="fixed" :scroll="{ x: 1200 }" :loading="loading">
          <template slot="action" slot-scope="row">
            <a @click="toDetail(row)">详情</a>
            <a @click="toEdit(row)">编辑</a>
          </template>
        </a-table>
      </div>
      <div class="paging-container">
        <a-pagination
          :current="query.currentPage"
          showQuickJumper
          :showTotal="(total) => `共 ${total} 条`"
          style="margin: 10px 0;"
          :total="total"
          :pageSize="query.pageSize"
          showLessItems
          @change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { formListQuery } from '@/service'
import { TableFilter } from '@/components'

const columns = Object.freeze([
  { title: '模板名称', width: 180, dataIndex: 'templateName', ellipsis: true },
  { title: '创建人', width: 120, dataIndex: 'createR', ellipsis: true },
  { title: '创建时间', width: 120, dataIndex: 'createTime', ellipsis: true },
  { title: '是否允许修改', width: 80, dataIndex: 'moidfy', ellipsis: true, customRender: (text) => (text === 0 ? '禁止' : '允许') },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 145,
    scopedSlots: { customRender: 'action' }
  }
])
export default {
  name: 'formList',
  components: { TableFilter },
  data() {
    return {
      loading: false,
      formList: [],
      columns,
      total: 0,
      query: {
        currentPage: 1,
        pageSize: 10,
        templateName: undefined
      },
      formFilters: [{ label: '公司名称', dataIndex: 'templateName' }]
    }
  },
  created() {
    this.statusChange()
  },
  methods: {
    creatNewForm() {
      this.$router.push({ path: '/createNew' })
    },
    handlePageChange(page, pageSize) {
      console.log(page)
      this.query.currentPage = page
      this.statusChange()
    },
    statusChange() {
      const { query, $route } = this
      if (Object.getOwnPropertyNames($route.query).length > 0) {
        Object.assign(query, {
          ...$route.query,
          currentPage: Number($route.query.currentPage),
          pageSize: Number($route.query.pageSize),
          ...query
        })
      }
      this.$router.replace({
        path: $route.path,
        query
      })
      this.loading = true
      this.queryFormList()
    },
    statusRest() {
      Object.assign(this.query, {
        currentPage: 1,
        pageSize: 10
      })
      this.statusChange()
    },
    queryFormList() {
      const { query } = this
      formListQuery(query)
        .then((res) => {
          const { records, total } = res.data
          this.formList = records
          this.total = total
        })
        .finally(() => {
          this.loading = false
        })
    },
    toDetail({ templateId }) {
      this.$router.push({ path: '/formDetail', query: { templateId } })
    },
    toEdit({ templateId }) {
      this.$router.push({ path: '/createNew', query: { templateId } })
    }
  }
}
</script>

<style></style>
