<!--
 * @Date: 2020-07-03 10:26:41
 * @LastEditors: xiangty
 * @LastEditTime: 2020-09-16 14:36:11
 * @FilePath: /control-library/src/modules/control/pages/approval/approvalType/index.vue
-->
<template>
  <div>
    <BreadNav :navLists="[{ label: '审批类型', url: $route.fullPath }]"></BreadNav>

    <div class="controls">
      <div class="title" v-if="!sort">
        <div class="left-bar">
          <div class="border"></div>
          <div class="tag">审批类型</div>
        </div>
        <div class="right-bar">
          <a-button type="primary" icon="plus" size="large" @click="goCreateNew">创建新模版</a-button>
          <a-button icon="swap" size="large" class="sort-btn" @click="sortTypes">分组排序</a-button>
        </div>
      </div>

      <!-- 普通列表状态 -->
      <div class="content" v-if="!sort">
        <div class="items" v-for="(item, index) in list" :key="index">
          <div class="items-title">
            <div class="items-name">{{ item.name }}（{{ item.num }}）</div>
            <div class="items-control" v-if="!item.sort">
              <!-- <a-button type="link" @click="editorTypes(index)">编辑</a-button> -->
              <a-button type="link" @click="sortLists(index)">排序</a-button>
            </div>
            <div class="items-control" v-if="item.sort">
              <a-button type="link" @click="sortListsCancel(index)">取消</a-button>
              <a-button type="link" @click="sortListsSave(index)">完成</a-button>
            </div>
          </div>
          <!-- 非列表排序状态 -->
          <div class="items-list" v-if="!item.sort">
            <div class="item" v-for="(item, index) in item.list" :key="index">
              <div class="info">
                <img :src="item.icon" alt="" class="icon" />
                <div class="infos">
                  <div class="name">{{ item.name }}</div>
                  <div class="purpose">{{ item.remark }}</div>
                  <div class="time">{{ item.updateDate }} 更新</div>
                </div>
              </div>
              <div class="area">
                <div class="area-title">可见范围</div>
                <div class="area-show">
                  <div class="areas">
                    <span v-for="(item, index) in item.sponsor" :key="index">{{ item.name || department[item.orders] }} </span>
                  </div>
                  <a-tooltip>
                    <template slot="title">
                      <span v-for="(item, index) in item.sponsor" :key="index">{{ item.name || department[item.orders] }} </span>
                    </template>
                    <a-button type="link">查看</a-button>
                  </a-tooltip>
                </div>
              </div>
              <div class="control">
                <a-button type="link" @click="editorTemp(item)">编辑</a-button>
                <a-button type="link" @click="stopTemp(item)">停用</a-button>
              </div>
            </div>
          </div>
          <!-- 列表排序状态 -->
          <draggable class="items-list" v-model="sortList" v-if="item.sort">
            <div class="item" v-for="(item, index) in sortList" :key="index">
              <a-icon type="drag" class="drag"></a-icon>
              <div class="info">
                <img :src="item.icon" alt="" class="icon" />
                <div class="infos">
                  <div class="name">{{ item.name }}</div>
                  <div class="purpose">{{ item.remark }}</div>
                  <div class="time">{{ item.updateDate }} 更新</div>
                </div>
              </div>
              <div class="area">
                <div class="area-title">可见范围</div>
                <div class="area-show">
                  <div class="areas">
                    <span v-for="(item, index) in item.sponsor" :key="index">{{ item.name || department[item.orders] }} </span>
                  </div>
                </div>
              </div>
            </div>
          </draggable>
        </div>
        <div class="items">
          <div class="items-title">
            <div class="items-name">{{ stop.name }}（{{ stop.num }}）</div>
          </div>
          <!-- 非列表排序状态 -->
          <div class="items-list">
            <div class="item" v-for="(item, index) in stop.list" :key="index">
              <div class="info">
                <img :src="item.icon" alt="" class="icon" />
                <div class="infos">
                  <div class="name">{{ item.name }}</div>
                  <div class="purpose">{{ item.remark }}</div>
                  <div class="time">{{ item.updateDate }} 更新</div>
                </div>
              </div>
              <div class="area">
                <div class="area-title">可见范围</div>
                <div class="area-show">
                  <div class="areas">
                    <span v-for="(item, index) in item.sponsor" :key="index">{{ item.name || department[item.orders] }} </span>
                  </div>
                  <a-tooltip>
                    <template slot="title">
                      <span v-for="(item, index) in item.sponsor" :key="index">{{ item.name || department[item.orders] }} </span>
                    </template>
                    <a-button type="link">查看</a-button>
                  </a-tooltip>
                </div>
              </div>
              <div class="control">
                <a-button type="link" @click="editorTemp(item)">编辑</a-button>
                <a-button type="link" @click="startTemp(item)">启用</a-button>
                <a-button type="link" @click="delTemp(item)">删除</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 分组排序状态 -->
      <div class="sort" v-if="sort">
        <div class="sort-title">
          <a-button type="primary" @click="sortTypesSave">保存</a-button>
          <a-button class="cancel" @click="sortTypesCancel">取消</a-button>
        </div>
        <draggable class="drag-area" v-model="sortList">
          <div class="item" v-for="(item, index) in sortList" :key="index">
            <div class="border"></div>
            <a-icon class="icon" type="drag" />
            <div class="name">{{ item.name }}（{{ item.num }}）</div>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { queryApprovalGroup, querySortTypes, querySortList, enableTemp, deleteTemp, getDepartment } from '@/service/approval/index.js'
import cloneDeep from 'lodash/cloneDeep'
import BreadNav from '../components/BreadNav.vue'
var moment = require('moment')

export default {
  name: 'approvalType',
  data() {
    return {
      list: [],
      stop: [],
      sort: false,
      sortList: null,
      department: {}
    }
  },
  created() {
    this.getDepartmentList()
    this.getList()
  },
  components: { draggable, BreadNav },
  methods: {
    goCreateNew() {
      this.$router.push({ path: '/createNew' })
    },
    // 获取列表
    getList() {
      queryApprovalGroup().then((res) => {
        let list = res.ApprovalGroupList.filter((item) => item.name !== '停用')
        let stop = res.approvalGroup
        list.forEach((item) => {
          item.sort = false
          item.list.map((item) => {
            item.updateDate = item.updateDate ? moment(item.updateDate).format('lll') : moment(item.createDate).format('lll')
          })
        })
        this.list = list
        this.stop = stop
      })
    },
    // 分组排序开启
    sortTypes() {
      if (this.sortList) {
        this.$messageSend.warning('请先完成当前排序操作')
        return
      }
      this.sortList = cloneDeep(this.list)
      this.sort = true
    },
    // 分组排序保存
    sortTypesSave() {
      let list = []
      this.sortList.forEach((item, index) => {
        let obj = {
          id: item.id,
          name: item.name,
          sequence: index + 1
        }
        list.push(obj)
      })
      querySortTypes(list).then((res) => {
        this.sortList = null
        this.sort = false
        this.getList()
      })
    },
    // 分组排序取消
    sortTypesCancel() {
      this.sort = false
      this.sortList = null
    },
    // 编辑分类
    editorTypes(index) {},
    // 开启小类排序
    sortLists(index) {
      if (this.sortList) {
        this.$messageSend.warning('请先完成当前排序操作')
        return
      }
      this.list[index].sort = true
      this.sortList = cloneDeep(this.list[index].list)
    },
    // 小类排序取消
    sortListsCancel(index) {
      this.sortList = null
      this.list[index].sort = false
    },
    // 小类排序保存
    sortListsSave(index) {
      let list = []
      this.sortList.forEach((item, index) => {
        let obj = {
          id: item.id,
          name: item.name,
          sequence: index + 1
        }
        list.push(obj)
      })
      querySortList(list).then((res) => {
        this.sortList = null
        this.getList()
      })
    },
    // 编辑
    editorTemp(item) {
      this.$router.push({ path: '/createNew', query: { id: item.id } })
    },
    // 删除
    delTemp(item) {
      let data = {
        templateId: item.id
      }
      deleteTemp(data).then((res) => {
        this.getList()
      })
    },
    // 启用
    startTemp(item) {
      let data = {
        templateId: item.id,
        type: Number(!item.available)
      }
      enableTemp(data).then((res) => {
        this.getList()
      })
    },
    // 停用
    stopTemp(item) {
      let data = {
        templateId: item.id,
        type: Number(!item.available)
      }
      enableTemp(data).then((res) => {
        this.getList()
      })
    },
    // 获取可见范围部门配置列表
    getDepartmentList() {
      getDepartment().then((res) => {
        res.map((item) => {
          let key = item.code[0]
          let val = item.name
          this.department[key] = val
        })
        this.department['all'] = '所有部门'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.controls {
  margin: 15px;
  background-color: #fff;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    padding: 0 30px;
    font-size: 16px;
    border-bottom: 1px solid #eee;

    .left-bar {
      display: flex;
      align-items: center;

      .border {
        width: 4px;
        height: 18px;
        background-color: #4c84ff;
        border-radius: 2px;
        margin-right: 15px;
      }
    }

    .right-bar {
      .sort-btn {
        border-color: #4c84ff;
        color: #4c84ff;
        margin-left: 10px;
      }
    }
  }

  .content {
    padding: 20px;

    .items {
      .items-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #f8f8f8;
        border-radius: 10px 10px 0px 0px;
        height: 56px;
        font-size: 16px;
        font-weight: 500;
        padding-left: 20px;
      }

      .items-list {
        .item {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
          background-color: #fff;

          .drag {
            width: 18px;
            height: 18px;
            font-weight: 700;
            margin-right: 20px;
          }

          .info {
            width: 400px;
            display: flex;
            border-right: 2px solid #eee;

            .icon {
              width: 50px;
              height: 50px;
              border-radius: 25px;
              margin-right: 15px;
            }

            .infos {
              div {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              .name {
                font-size: 16px;
                font-weight: 500;
                color: #000;
                line-height: 16px;
                margin-bottom: 14px;
                max-width: 300px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }

              .purpose,
              .time {
                color: #595959;
                font-size: 14px;
                line-height: 14px;
              }

              .purpose {
                margin-bottom: 14px;
                max-width: 300px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }

          .area {
            padding-left: 20px;
            width: 420px;
            border-right: 2px solid #eee;
            padding-top: 15px;

            .area-title {
              color: #595959;
              font-size: 14px;
              line-height: 14px;
              margin-bottom: 13px;
            }

            .area-show {
              display: flex;
              align-items: center;

              .areas {
                color: #595959;
                font-size: 14px;
                line-height: 14px;
                width: 140px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-right: 15px;
              }
            }
          }
        }

        .item:last-child {
          border-bottom: none;
        }
      }
    }
  }

  .sort {
    .sort-title {
      border-bottom: 1px solid #eee;
      padding: 20px;

      .cancel {
        border-color: #4c84ff;
        color: #4c84ff;
      }
    }

    .drag-area {
      padding: 20px;

      .item {
        background-color: #f7faff;
        border-radius: 5px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        .border {
          width: 5px;
          height: 67px;
          background-color: #4c84ff;
          border-radius: 3px 0px 0px 3px;
          margin-right: 20px;
        }

        .icon {
          width: 18px;
          height: 18px;
          margin-right: 16px;
        }

        .name {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
