<!--
 * @Date: 2020-07-27 19:48:16
 * @LastEditors: fy
 * @LastEditTime: 2020-10-09 15:22:38
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/components/FlowDesign/FlowControl.vue
-->

<script>
import _ from 'lodash'
import { queryUser } from '@/service/approval/index.js'
import { TreeSelect } from 'ant-design-vue'
const SHOW_PARENT = TreeSelect.SHOW_PARENT
export default {
  props: ['source', 'open', 'tree'],
  inject: ['fields'],
  methods: {
    closeHandler() {
      this.config = null
      this.data = []
      this.value = []
      this.fetching = false
      this.$emit('close')
    },
    addList() {
      if (this.config.fieldName === '') {
        this.$messageSend.warning('请先选择需要添加条件的控件')
        return
      }
      if (this.config.conditionList.length > 3) {
        this.$messageSend.warning('最多可添加四个条件')
        return
      }
      let arr = this.config.fieldName.split('-')
      arr.shift()
      let field = arr.join('-')
      this.config.conditionList.push({
        content: null,
        operator: null,
        type: 1,
        field: field
      })
    },
    delList(index) {
      // console.log(index, this.config.conditionList)
      // console.log(index)
      // if (index === 0) {
      //   this.config.conditionList.shift()
      //   return
      // }
      // console.log(1)
      // this.config.conditionList.splice(index, 1)

      let arr = _.cloneDeep(this.config.conditionList).filter((item, i) => i !== index)
      // this.config.conditionList = this.config.conditionList.filter((item, i) => i !== index)
      // this.config.conditionList = arr
      console.log(arr)
      this.config.conditionList = arr
    },

    changeApproverType(e) {
      if (e.target.value !== this.config.postType) {
        this.config.postType = e.target.value
        this.config.postList = []
        this.data = []
        this.fetching = false
      }
    },
    handleChange(value) {
      this.config.postList = value
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
    // 通知更改
    notifyChange() {
      if (this.config.type === 0) {
        if (this.config.sponsor.length === 0) return
        let arr = []
        this.config.sponsor.forEach((item) => {
          let obj = {
            name: item.label,
            orders: item.value
          }
          arr.push(obj)
        })
        this.$emit('up', arr)
      }

      if (this.config.type === 1) {
        if (this.config.postList.length === 0) return
        if (this.config.postType === 1) {
          let arr = []
          this.config.postList.forEach((item) => {
            let obj = {}
            if (item.value.indexOf('-') > -1) {
              obj = {
                postName: item.value.split('-')[0],
                orders: item.value.split('-')[1],
                id: 0
              }
            } else {
              obj = {
                postName: '',
                orders: item.value,
                id: 0
              }
            }
            arr.push(obj)
          })
          this.$emit('up', { arr: arr, type: this.config.postType })
        } else {
          let arr = []
          this.config.postList.forEach((item) => {
            let obj = {
              postName: item.label,
              postId: item.key,
              id: 0
            }
            arr.push(obj)
          })
          this.$emit('up', { arr: arr, type: this.config.postType })
        }
      }

      if (this.config.type === 2) {
        if (this.config.conditionList.length === 0) return
        this.$emit('up', this.config, this.config.postType)
      }
    },
    // 树选择器修改值
    treeChange(e) {
      if (this.config.type === 1) {
        this.config.postList = e
      } else {
        this.config.sponsor = e
      }
    },
    // 初始化数据，用于展示
    initValue() {
      if (this.config.type === 1 && this.config.postList.length > 0) {
        let arr = []
        if (this.config.postType === 2) {
          this.config.postList.forEach((item) => {
            let obj = {
              label: item.postName,
              key: item.postId
            }
            arr.push(obj)
          })
        } else {
          this.config.postList.forEach((item) => {
            let obj = {}
            if (item.postName) {
              obj = {
                value: `${item.postName}-${item.orders}`
              }
            } else {
              obj = {
                value: item.orders
              }
            }

            arr.push(obj)
          })
        }
        this.config.postList = arr
      }

      if (this.config.type === 0) {
        let arr = []

        this.config.sponsor.forEach((item) => {
          // let str = item.order ? `${item.name}-${item.order}` : `${item.name}`
          let obj = {
            label: item.orders === 'all' ? '所有部门' : item.name,
            value: item.orders
          }
          arr.push(obj)
        })

        this.config.sponsor = arr
      }
    },
    // 修改条件符号
    changeCondition(index, e) {
      this.config.conditionList[index].operator = e
    },
    // 修改数目
    changeNum(index, e) {
      this.config.conditionList[index].content = e
    },
    selectField(e) {
      this.config.fieldName = e
      let arr = e.split('-')
      arr.shift()
      let field = arr.join('-')

      this.config.conditionList.forEach((item) => {
        item.field = field
      })
    }
  },

  data() {
    this.lastFetchId = 0
    this.handleSearch = _.debounce(this.handleSearch, 800)
    return {
      config: {},
      data: [], // 查询到的管理员list
      value: ['所有人'], // 选择的管理员list
      fetching: false,
      selectFields: null,
      SHOW_PARENT
    }
  },
  watch: {
    source: {
      handler: function(val) {
        this.config = val || {}
        if (this.config.fieldName) {
          this.selectFields.forEach((item) => {
            if (item.indexOf(this.config.fieldName) !== -1) {
              this.config.fieldName = item
            }
          })
        }
        this.initValue()
      }
    }
  },
  created() {
    this.selectFields = _.cloneDeep(this.fields())
  },

  render: function(h) {
    // 分情况返回
    if (this.config.type === 0) {
      return (
        <a-drawer maskClosable={true} onClose={this.closeHandler.bind(this)} width="454" title="发起人" placement="right" closable={false} visible={this.open}>
          <div class="title">谁可以提交</div>
          <a-tree-select
            label-in-value={true}
            onChange={this.treeChange.bind(this)}
            value={this.config.sponsor}
            style="width: 70%"
            tree-data={this.tree}
            tree-checkable
            show-checked-strategy={this.SHOW_PARENT}
            placeholder="请选择职位"
          />

          <a-button type="primary" class="btn" onClick={this.notifyChange.bind(this)}>
            确认
          </a-button>
        </a-drawer>
      )
    }

    if (this.config.type === 2) {
      return (
        <a-drawer maskClosable={true} onClose={this.closeHandler} width="454" title="条件" placement="right" closable={false} visible={this.open}>
          <div class="title">设置条件</div>
          <a-select value={this.config.fieldName} style="width:200px;" placeholder="请选择绑定参数" onChange={this.selectField.bind(this)}>
            {this.selectFields.map((item) => {
              return <a-select-option value={item}>{item}</a-select-option>
            })}
          </a-select>
          <a-alert message="当审批单同时满足以下条件进入此流程" banner class="tips" />
          <a-button class="tips" type="primary" onClick={this.addList.bind(this)}>
            添加条件
          </a-button>
          {this.config.conditionList.map((item, index) => {
            return (
              <div>
                <div>{this.config.fieldName}:</div>
                <div class="item">
                  <a-select defaultValue={item.operator} style="width: 100px" onChange={this.changeCondition.bind(this, index)}>
                    <a-select-option value="==">等于</a-select-option>
                    <a-select-option value=">=">大于等于</a-select-option>
                    <a-select-option value="<=">小于等于</a-select-option>
                    <a-select-option value=">">大于</a-select-option>
                    <a-select-option value="<">小于</a-select-option>
                  </a-select>
                  <a-input-number value={item.content || null} style="width: 100px" onChange={this.changeNum.bind(this, index)}></a-input-number>
                  <a-button icon="minus" shape="circle" type="danger" onClick={this.delList.bind(this, index)}></a-button>
                </div>
              </div>
            )
          })}
          <a-button type="primary" class="tips" style="display: block;" onClick={this.notifyChange.bind(this)}>
            确认
          </a-button>
        </a-drawer>
      )
    }

    if (this.config.type === 1) {
      return (
        <a-drawer class="box" maskClosable={true} onClose={this.closeHandler} width="454" title="审批人" placement="right" closable={false} visible={this.open}>
          <div class="title">设置审批人</div>
          <a-radio-group defaultValue={this.config.postType} class="tips" onChange={this.changeApproverType.bind(this)}>
            <a-radio value={1}>职位</a-radio>
            <a-radio value={2}>指定审批人</a-radio>
          </a-radio-group>
          {this.config.postType === 2 ? (
            <a-select
              mode="multiple"
              label-in-value
              placeholder="输入姓名查找"
              style="width: 70%;"
              filter-option={false}
              value={this.config.postList}
              not-found-content={this.fetching ? undefined : null}
              onSearch={this.handleSearch.bind(this)}
              onChange={this.handleChange.bind(this)}
            >
              {this.fetching && <a-spin slot="notFoundContent" size="small" />}
              {this.data.map((item, index) => {
                return (
                  <a-select-option value={item.userId} key={index + item.userId}>
                    {item.userName}
                  </a-select-option>
                )
              })}
            </a-select>
          ) : (
            <a-tree-select
              label-in-value={true}
              onChange={this.treeChange.bind(this)}
              defaultValue={this.config.postList}
              style="width: 70%"
              tree-data={this.tree}
              tree-checkable
              show-checked-strategy={this.SHOW_PARENT}
              placeholder="请选择职位"
            />
          )}
          <a-button type="primary" class="btn" style="display: block;" onClick={this.notifyChange.bind(this)}>
            确认
          </a-button>
        </a-drawer>
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  line-height: 14px;
  font-size: 14px;
  margin-bottom: 14px;
}

.btn {
  margin-top: 14px;
}

.tips {
  margin-bottom: 14px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  margin-top: 14px;
}
</style>
