<!--
 * @Author: your name
 * @Date: 2020-11-02 22:35:01
 * @LastEditTime: 2020-12-10 22:48:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \control-library\src\components\TableFilter.vue
-->
<template>
  <!-- 筛选组件 -->
  <div class="filter_root filter">
    <div class="filter_left">
      <template v-for="(item, index) in filters">
        <div :key="index" class="filter-item_container">
          <span class="filter-label_text">{{ item.label }}：</span>
          <slot :name="item['dataIndex']"></slot>
        </div>
      </template>
    </div>
    <!-- <div class="collapse_main"></div> -->
    <div class="filter_right">
      <slot name="filterOptions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  data() {
    return {}
  },
  props: {
    filters: {
      type: Array,
      default: () => {
        return [
          { label: '输入框搜索', dataIndex: 'input' },
          { label: 'select搜索', dataIndex: 'select' },
          { label: '级联搜索', dataIndex: 'cascader' }
        ]
      }
    },
    options: {
      type: Array,
      default: () => {
        return [
          { text: '重置', type: 'default' },
          { text: '查询', type: 'primary' }
        ]
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    // 方法调用不需要注释，方法定义需要注释
    // 方法注释规则 /** */
    clickOption() {}
  }
}
</script>

<style lang="scss" scoped>
.filter_root {
  align-items: flex-start;
  min-height: 70px;
  height: auto;
  border-radius: 2px;
  background-color: #f6f6f6;
  padding-bottom: 16px;
  margin: 20px $padding-main;
  .filter_left {
    flex: 0 0 50%;
    display: flex;
    flex-wrap: wrap;
    .filter-item_container {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      margin-right: 34px;
      padding-top: 16px;
      &:last-child {
        margin-right: 0;
      }
    }
    .filter-label_text {
      white-space: nowrap;
    }
  }
  .filter_right {
    padding-top: 16px;
    .option-btns {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
</style>
