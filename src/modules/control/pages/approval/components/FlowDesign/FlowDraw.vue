<!--
 * @Date: 2020-07-27 09:57:01
 * @LastEditors: fy
 * @LastEditTime: 2020-09-28 14:29:45
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/components/FlowDesign/FlowDraw.vue
-->

<script>
import { getDepartment } from '@/service/approval/index.js'
function NodeFactory(data, h) {
  if (!data) return
  let nodeList = []
  let self
  // let child
  // 起始节点
  if (data.type === 0) {
    self = (
      <div class="node">
        <div class="node-wrap">
          <div class="line"></div>
          <div style="display: inline-block;" onClick={this.chooseNodes.bind(this, data)}>
            <div class="top">发起人</div>
            <div class="bottom">
              <div>
                {data.sponsor.map((item, index) => {
                  return (
                    <span>
                      {item.name || this.department[item.orders]}
                      {index === data.sponsor.length - 1 ? '' : '、'}
                    </span>
                  )
                })}
              </div>
              <a-icon type="right"></a-icon>
            </div>
          </div>
          {addButtons.call(this, data, h)}
        </div>
        {data.list.length === 1 && NodeFactory.call(this, data.list[0], h)}
        {data.list.length > 1 && (
          <div class="conditions">
            <a-button class="add-btn" type="primary" onClick={this.addNodes.bind(this, 'addCondition', data)}>
              添加条件
            </a-button>
            {data.list.map((node) => NodeFactory.call(this, node, h))}
          </div>
        )}
        <div class="node-wrap-end"></div>
      </div>
    )
  }
  // 审核节点
  if (data.type === 1) {
    self = (
      <div class="approver">
        <div class="node-wrap">
          <div class="line"></div>
          <div style="display: inline-block;position: relative;">
            <div class="top approver-top" onClick={this.chooseNodes.bind(this, data)}>
              <span>审核人</span>
            </div>
            <div class="bottom" onClick={this.chooseNodes.bind(this, data)}>
              <div>
                {data.postList.length > 0 ? (
                  data.postList.map((item, index) => {
                    return (
                      <span>
                        {item.postName ? item.postName : this.department[item.orders]}
                        {index === data.postList.length - 1 ? '' : '、'}
                      </span>
                    )
                  })
                ) : (
                  <span>请设置审核人</span>
                )}
              </div>

              <a-icon type="right"></a-icon>
            </div>
            <a-icon class="icon" type="close" onClick={this.delNodes.bind(this, data, event)}></a-icon>
          </div>
          {addButtons.call(this, data, h)}
        </div>
        {data.list.length === 1 && NodeFactory.call(this, data.list[0], h)}

        {data.list.length > 1 && (
          <div class="conditions">
            <a-button class="add-btn" type="primary" onClick={this.addNodes.bind(this, 'addCondition', data)}>
              添加条件
            </a-button>
            {data.list.map((node) => NodeFactory.call(this, node, h))}
          </div>
        )}
      </div>
    )
  }

  // 条件节点
  if (data.type === 2) {
    self = (
      <div class="col">
        <div class="line"></div>
        <div class="inner">
          <div onClick={this.chooseNodes.bind(this, data)} style="padding: 16px;">
            <div class="top">条件</div>
            {data.conditionList.length > 0 ? <div class="bottom">已设置条件</div> : <div class="bottom">请设置条件</div>}
          </div>

          <a-icon type="close" class="close" onClick={this.delNodes.bind(this, data)}></a-icon>
        </div>
        {addButtons.call(this, data, h)}
        {data.list.length === 1 && NodeFactory.call(this, data.list[0], h)}

        {data.list.length > 1 && (
          <div class="conditions">
            <a-button class="add-btn" type="primary" onClick={this.addNodes.bind(this, 'addCondition', data)}>
              添加条件
            </a-button>
            {data.list.map((node) => NodeFactory.call(this, node, h))}
          </div>
        )}
      </div>
    )
  }

  self && nodeList.push(self)

  return nodeList
}

function addButtons(data, h) {
  if (data.type === 2) {
    return (
      <div class="btns">
        <a-popover placement="right">
          <template slot="content">
            <div style="display: flex;width:200px;">
              <div style="textAlign: center;flex:1;cursor:pointer;" onClick={this.addNodes.bind(this, 'addApprover', data)}>
                <svg t="1596421670899" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2585" width="48" height="48">
                  <path
                    d="M874.8995117187501 640.27021484375H613.14716796875v-4.75927734375c-21.710742187500003-20.24033203125-35.20634765625-48.153515625-35.20634765625-79.01015625000001 0-29.281640625 12.228222656249999-55.822851562500006 32.056347656250004-75.72128906249999 0.034277343749999994-0.033398437499999996 0.1037109375-0.033398437499999996 0.17314453125-0.06679687499999999 0.06767578125-0.1037109375 0.23818359375000003-0.17138671875000003 0.34101562500000004-0.207421875 6.712207031249999-6.712207031249999 14.27958984375-12.70546875 22.56943359375-17.7046875 35.651074218750004-32.5353515625 58.15107421875-79.28349609375 58.15107421875-131.33935546875 0-98.39091796874999-79.72734375-178.1525390625-178.119140625-178.1525390625s-178.119140625 79.76162109375001-178.119140625 178.1525390625c0 52.055859375000004 22.5 98.80400390625 58.186230468750004 131.33935546875 8.28720703125 4.99921875 15.821191406250003 10.99248046875 22.56767578125 17.7046875 0.13710937499999998 0.03603515625 0.23994140625000004 0.1037109375 0.37705078124999997 0.207421875 0.034277343749999994 0.033398437499999996 0.0703125 0.033398437499999996 0.13710937499999998 0.06679687499999999 19.8298828125 19.899316406249998 32.02119140625 46.439648437500004 32.02119140625 75.72128906249999 0 30.855761718750003-13.4947265625 58.7689453125-35.20634765625 79.01015625000001v4.75927734375H151.3583984375c-14.17763671875 0-25.684277343749997 11.471484375-25.684277343749997 25.582324218750003v152.70732421875002h774.8762695312499V665.8534179687501c0-14.11171875-11.437207031249999-25.583203125-25.65087890625-25.583203125zM159.85126953125 838.8353515624999h706.5210937500001v37.56884765625H159.85126953125z"
                    p-id="2586"
                    fill="#1296db"
                  ></path>
                </svg>
                <p>审批人</p>
              </div>
            </div>
          </template>
          <a-button type="primary" shape="circle" icon="plus"></a-button>
        </a-popover>
      </div>
    )
  } else {
    // 如果两个审核之间，只能添加审核
    if (data.list.length !== 1) {
      return (
        <div class="btns">
          <a-popover placement="right">
            <template slot="content">
              <div style="display: flex;width:200px;">
                <div style="textAlign: center;flex:1;cursor:pointer;" onClick={this.addNodes.bind(this, 'addApprover', data)}>
                  <svg t="1596421670899" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2585" width="48" height="48">
                    <path
                      d="M874.8995117187501 640.27021484375H613.14716796875v-4.75927734375c-21.710742187500003-20.24033203125-35.20634765625-48.153515625-35.20634765625-79.01015625000001 0-29.281640625 12.228222656249999-55.822851562500006 32.056347656250004-75.72128906249999 0.034277343749999994-0.033398437499999996 0.1037109375-0.033398437499999996 0.17314453125-0.06679687499999999 0.06767578125-0.1037109375 0.23818359375000003-0.17138671875000003 0.34101562500000004-0.207421875 6.712207031249999-6.712207031249999 14.27958984375-12.70546875 22.56943359375-17.7046875 35.651074218750004-32.5353515625 58.15107421875-79.28349609375 58.15107421875-131.33935546875 0-98.39091796874999-79.72734375-178.1525390625-178.119140625-178.1525390625s-178.119140625 79.76162109375001-178.119140625 178.1525390625c0 52.055859375000004 22.5 98.80400390625 58.186230468750004 131.33935546875 8.28720703125 4.99921875 15.821191406250003 10.99248046875 22.56767578125 17.7046875 0.13710937499999998 0.03603515625 0.23994140625000004 0.1037109375 0.37705078124999997 0.207421875 0.034277343749999994 0.033398437499999996 0.0703125 0.033398437499999996 0.13710937499999998 0.06679687499999999 19.8298828125 19.899316406249998 32.02119140625 46.439648437500004 32.02119140625 75.72128906249999 0 30.855761718750003-13.4947265625 58.7689453125-35.20634765625 79.01015625000001v4.75927734375H151.3583984375c-14.17763671875 0-25.684277343749997 11.471484375-25.684277343749997 25.582324218750003v152.70732421875002h774.8762695312499V665.8534179687501c0-14.11171875-11.437207031249999-25.583203125-25.65087890625-25.583203125zM159.85126953125 838.8353515624999h706.5210937500001v37.56884765625H159.85126953125z"
                      p-id="2586"
                      fill="#1296db"
                    ></path>
                  </svg>
                  <p>审批人</p>
                </div>
                <div style="textAlign: center;flex:1;cursor:pointer;" onClick={this.addNodes.bind(this, 'addCondition', data)}>
                  <svg t="1596421483431" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2149" width="48" height="48">
                    <path
                      d="M832 708.032A128.064 128.064 0 0 1 800 960a128 128 0 0 1-32-251.968V576a32 32 0 0 0-32-32H288a32 32 0 0 0-32 32v132.032A128.064 128.064 0 0 1 224 960a128 128 0 0 1-32-251.968V544a64 64 0 0 1 64-64h224V315.968A128.064 128.064 0 0 1 512 64a128 128 0 0 1 32 251.968V480h224a64 64 0 0 1 64 64v164.032zM512 256a64 64 0 1 0 0-128 64 64 0 0 0 0 128zM224 896a64 64 0 1 0 0-128 64 64 0 0 0 0 128z m576 0a64 64 0 1 0 0-128 64 64 0 0 0 0 128z"
                      fill="#1296db"
                      p-id="2150"
                    ></path>
                  </svg>
                  <p>条件节点</p>
                </div>
              </div>
            </template>
            <a-button type="primary" shape="circle" icon="plus"></a-button>
          </a-popover>
        </div>
      )
    } else {
      return (
        <div class="btns">
          <a-popover placement="right">
            <template slot="content">
              <div style="display: flex;width:200px;">
                <div style="textAlign: center;flex:1;cursor:pointer;" onClick={this.addNodes.bind(this, 'addApprover', data)}>
                  <svg t="1596421670899" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2585" width="48" height="48">
                    <path
                      d="M874.8995117187501 640.27021484375H613.14716796875v-4.75927734375c-21.710742187500003-20.24033203125-35.20634765625-48.153515625-35.20634765625-79.01015625000001 0-29.281640625 12.228222656249999-55.822851562500006 32.056347656250004-75.72128906249999 0.034277343749999994-0.033398437499999996 0.1037109375-0.033398437499999996 0.17314453125-0.06679687499999999 0.06767578125-0.1037109375 0.23818359375000003-0.17138671875000003 0.34101562500000004-0.207421875 6.712207031249999-6.712207031249999 14.27958984375-12.70546875 22.56943359375-17.7046875 35.651074218750004-32.5353515625 58.15107421875-79.28349609375 58.15107421875-131.33935546875 0-98.39091796874999-79.72734375-178.1525390625-178.119140625-178.1525390625s-178.119140625 79.76162109375001-178.119140625 178.1525390625c0 52.055859375000004 22.5 98.80400390625 58.186230468750004 131.33935546875 8.28720703125 4.99921875 15.821191406250003 10.99248046875 22.56767578125 17.7046875 0.13710937499999998 0.03603515625 0.23994140625000004 0.1037109375 0.37705078124999997 0.207421875 0.034277343749999994 0.033398437499999996 0.0703125 0.033398437499999996 0.13710937499999998 0.06679687499999999 19.8298828125 19.899316406249998 32.02119140625 46.439648437500004 32.02119140625 75.72128906249999 0 30.855761718750003-13.4947265625 58.7689453125-35.20634765625 79.01015625000001v4.75927734375H151.3583984375c-14.17763671875 0-25.684277343749997 11.471484375-25.684277343749997 25.582324218750003v152.70732421875002h774.8762695312499V665.8534179687501c0-14.11171875-11.437207031249999-25.583203125-25.65087890625-25.583203125zM159.85126953125 838.8353515624999h706.5210937500001v37.56884765625H159.85126953125z"
                      p-id="2586"
                      fill="#1296db"
                    ></path>
                  </svg>
                  <p>审批人</p>
                </div>
              </div>
            </template>
            <a-button type="primary" shape="circle" icon="plus"></a-button>
          </a-popover>
        </div>
      )
    }
  }
}
export default {
  props: {
    scale: {
      type: Number,
      default: 100
    },
    data: {
      type: Object
    }
  },
  data() {
    return {
      department: {}
    }
  },
  created() {
    this.getAllDepartment()
  },
  methods: {
    getAllDepartment() {
      getDepartment().then((res) => {
        res.map((item) => {
          let key = item.code[0]
          let val = item.name
          this.department[key] = val
        })
        this.department['all'] = '所有部门'
        this.$forceUpdate()
      })
    },
    addNodes(type, data) {
      this.$emit('add', type, data)
    },
    delNodes(data) {
      this.$emit('del', data)
    },
    chooseNodes(data) {
      this.$emit('editor', data)
    }
  },

  render: function(h) {
    return (
      <div class="box" style={{ transform: `scale(${this.scale / 100})` }}>
        {this.data && NodeFactory.call(this, this.data, h)}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.box {
  margin: 0 auto;
  display: inline-flex;
  flex-direction: column;

  .node {
    .node-wrap {
      position: relative;
      font-size: 16px;

      .line {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        width: 1px;
        height: 100%;
        background-color: #eee;
      }

      .top {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 310px;
        height: 56px;
        background-color: #4c84ff;
        border-radius: 10px 10px 0px 0px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px;
      }

      .approver-top {
        background-color: #ff8712;
      }

      .bottom {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        width: 310px;
        height: 56px;
        background-color: #ffffff;
        border-radius: 0px 0px 10px 10px;
        border: solid 1px #eeeeee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        color: #2e2e2e;

        div {
          max-width: 260px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }

      .icon {
        padding: 20px;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
      }

      .btns {
        position: relative;
        padding: 30px 0 48px;
      }
    }

    .conditions {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      margin-bottom: 40px;
      position: relative;

      .add-btn {
        position: absolute;
        left: 50%;
        top: -16px;
        z-index: 2;
        transform: translateX(-50%);
      }

      .col {
        padding: 0 43px;
        position: relative;
        flex: 1;

        .line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100%;
          background-color: #eee;
        }

        .inner {
          position: relative;
          width: 222px;
          margin: 34px auto;
          border-radius: 10px;
          border: solid 1px #eeeeee;
          background-color: #fff;
          text-align: left;

          .top {
            color: #4c84ff;
            font-size: 14px;
            line-height: 14px;
            margin-bottom: 15px;
          }

          .bottom {
            color: #000000;
            font-size: 16px;
            line-height: 16px;
          }

          .close {
            position: absolute;
            top: 0;
            right: 0;
            padding: 10px;
            cursor: pointer;
          }
        }

        .btns {
          padding-bottom: 30px;
        }
      }

      .col:nth-child(2) {
        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: -2px;
          width: 50%;
          height: 4px;
          background-color: #fff;
        }

        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 50%;
          height: 4px;
          background-color: #fff;
        }
      }

      .col:last-child {
        &::before {
          content: '';
          position: absolute;
          right: 0;
          top: -2px;
          width: 50%;
          height: 4px;
          background-color: #fff;
        }

        &::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: -2px;
          width: 50%;
          height: 4px;
          background-color: #fff;
        }
      }
    }
  }
}
</style>
