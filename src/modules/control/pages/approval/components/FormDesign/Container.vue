<!--
 * @Date: 2020-07-13 14:32:19
 * @LastEditors: fy
 * @LastEditTime: 2020-09-23 18:10:52
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/components/FormDesign/Container.vue
-->
<template>
  <div class="container">
    <div class="mobile" v-if="type === 'mobile'">
      <div class="box">
        <draggable class="dragArea" group="people" :list="list" @change="insert">
          <div :class="choosed === index ? 'item active' : 'item'" v-for="(item, index) in list" :key="index" @click="choose($event, index)">
            <!-- 单行文本 || 数字输入框 -->
            <div class="input" v-if="item.tag === 'input' || item.tag === 'input-number'">
              <span class="title">{{ item.title }}</span>
              <span class="tips">{{ item.tips }}</span>
            </div>
            <!-- 多行文本 -->
            <div class="multInput" v-if="item.tag === 'textarea'">
              <div class="title">{{ item.title }}</div>
              <div class="tips">{{ item.tips }}</div>
            </div>
            <!-- 单选框 -->
            <div class="radio" v-if="item.tag === 'radio'">
              <div class="title">{{ item.title }}</div>
              <div class="options">
                <div class="option" v-for="(item, index) in item.options" :key="index">
                  <input type="radio" name="" id="" />
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
            <!-- 多选框 || 日期 || 省市区 || 同事 -->
            <div class="multRadio" v-if="item.tag === 'radio-group' || item.tag === 'date' || item.tag === 'address' || item.tag === 'mates'">
              <div class="title">{{ item.title }}</div>
              <div class="tips">
                <span>{{ item.tips }}</span
                ><a-icon type="right" />
              </div>
            </div>
            <!-- 图片 || 文件 -->
            <div class="upload" v-if="item.tag === 'file' || item.tag === 'pic'">
              <div class="title">
                <span class="mainTitle">{{ item.title }}</span>
                <span class="tips">{{ item.tips }}</span>
              </div>
              <div class="upIcon">
                <a-icon type="plus" />
              </div>
            </div>
            <!-- 说明文字 -->
            <div class="tooltips" v-if="item.tag === 'tooltips'">*{{ item.tips }}</div>
            <!-- 日期区间 -->
            <div class="dateRange" v-if="item.tag === 'range-date'">
              <div class="top">
                <div class="title">{{ item.title }}</div>
                <div class="tips">
                  <span>{{ item.tips }}</span
                  ><a-icon type="right" />
                </div>
              </div>
              <div class="bottom">
                <div class="title">{{ item.title }}</div>
                <div class="tips">
                  <span>{{ item.tips }}</span
                  ><a-icon type="right" />
                </div>
              </div>
            </div>
            <!-- 资产选择 -->
            <div class="assets" v-if="item.tag === 'assets'">
              <div class="title">{{ item.title }}</div>
              <div class="assetsOptions" v-for="n in item.initialNum" :key="n">
                <div class="left">
                  <span>{{ item.tips }}</span>
                  <a-icon type="down"></a-icon>
                </div>
                <div class="right">
                  <span>数量:</span>
                  <span class="inputBox"></span>
                </div>
              </div>
              <div class="add"><a-button type="primary" icon="plus"></a-button></div>
            </div>

            <!-- 资产归还 -->
            <div class="assetReturn" v-if="item.tag === 'assetReturn'">
              <h1>资产归还</h1>
              <div class="assetReturnItem">
                <span class="left">品牌:</span>
                <span class="right">华为</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">类型:</span>
                <span class="right">电脑</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">型号:</span>
                <span class="right">MateBook Pro</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">分配日期:</span>
                <span class="right">2020/1/2</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">归还类型:</span>
                <span class="right">直接交还</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">物流类型:</span>
                <span class="right">快递</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">姓名:</span>
                <span class="right">张三</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">电话:</span>
                <span class="right">123113131313</span>
              </div>
            </div>
            <div class="del" v-if="index === choosed" @click="del(index)">
              x
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <div class="pc" v-if="type === 'pc'">
      <div class="box">
        <draggable class="dragArea" group="people" :list="list" @change="insert">
          <div v-for="(item, index) in list" :key="index" :class="choosed === index ? 'item active' : 'item'" @click="choose($event, index)">
            <!-- 单行文本 || 数字输入框 -->
            <div class="input" v-if="item.tag === 'input' || item.tag === 'input-number'">
              <div class="title">{{ item.title }}:</div>
              <div class="area">{{ item.tips }}</div>
            </div>
            <!-- 多行文本 -->
            <div class="textarea" v-if="item.tag === 'textarea'">
              <div class="title">{{ item.title }}:</div>
              <div class="area">{{ item.tips }}</div>
            </div>
            <!-- 单选 -->
            <div class="radio" v-if="item.tag === 'radio'">
              <div class="title">{{ item.title }}:</div>
              <div class="area">
                <div v-for="(item, index) in item.options" :key="index">
                  <input type="radio" name="1" :value="item" /><label for="1">{{ item }}</label>
                </div>
              </div>
            </div>
            <!-- 多选 -->
            <div class="multRadio" v-if="item.tag === 'radio-group'">
              <div class="title">{{ item.title }}:</div>
              <div class="area">
                <div v-for="(item, index) in item.options" :key="index">
                  <input type="checkbox" name="1" :value="item" /><label for="1">{{ item }}</label>
                </div>
              </div>
            </div>
            <!-- 日期 -->
            <div class="date" v-if="item.tag === 'date'">
              <div class="title">{{ item.title }}:</div>
              <div class="area">
                <span>{{ item.tips }}</span>
                <img src="@/assets/img/approval/single-date.png" alt="" />
              </div>
            </div>
            <!-- 日期区间 -->
            <div class="dateRange" v-if="item.tag === 'range-date'">
              <div class="title">{{ item.title }}:</div>
              <div class="area">
                <span>起始日期</span>
                <span>~</span>
                <span>终止时间</span>
              </div>
            </div>
            <!-- 提示说明 -->
            <div class="tooltips" v-if="item.tag === 'tooltips'">
              <div class="title"></div>
              <div class="area">*{{ item.tips }}</div>
            </div>

            <!-- 上传 -->
            <div class="upload" v-if="item.tag === 'file' || item.tag === 'pic'">
              <div class="title">{{ item.title }}:</div>
              <div class="area">
                <a-icon class="icon" type="plus" />
                <div class="word">
                  添加附件
                </div>
              </div>
            </div>
            <!-- 同事 || 省市区 -->
            <div class="select" v-if="item.tag === 'address' || item.tag === 'mates'">
              <div class="title">{{ item.title }}:</div>
              <div class="area">
                <span>{{ item.tips }}</span>
                <a-icon class="icon" type="down"></a-icon>
              </div>
            </div>

            <!-- 资产选择 -->
            <div class="assets" v-if="item.tag === 'assets'">
              <div class="title">{{ item.title }}:</div>

              <div class="assetsOptions">
                <div class="assetsItem" v-for="n in item.initialNum" :key="n">
                  <div class="left">
                    <span>{{ item.tips }}</span>
                    <a-icon type="down"></a-icon>
                  </div>
                  <div class="right">
                    <span>数量:</span>
                    <span class="inputBox"></span>
                  </div>
                </div>
                <div class="icon">
                  <a-button type="primary" icon="plus"></a-button>
                </div>
              </div>
            </div>

            <!-- 资产归还 -->
            <div class="assetReturn" v-if="item.tag === 'assetReturn'">
              <h1>资产归还</h1>
              <div class="assetReturnItem">
                <span class="left">品牌:</span>
                <span class="right">华为</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">类型:</span>
                <span class="right">电脑</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">型号:</span>
                <span class="right">MateBook Pro</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">分配日期:</span>
                <span class="right">2020/1/2</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">归还类型:</span>
                <span class="right">直接交还</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">物流类型:</span>
                <span class="right">快递</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">姓名:</span>
                <span class="right">张三</span>
              </div>
              <div class="assetReturnItem">
                <span class="left">电话:</span>
                <span class="right">123113131313</span>
              </div>
            </div>

            <div class="del" v-if="index === choosed" @click="del(index)">
              x
            </div>
          </div>
        </draggable>
      </div>
    </div>
    <div class="type">
      <div :class="type === 'mobile' ? 'active' : ''" @click="changeType('mobile')">
        <img v-show="type === 'mobile'" src="@/assets/img/approval/phone-a.png" alt="" />
        <img v-show="type !== 'mobile'" src="@/assets/img/approval/phone-n.png" alt="" />
      </div>
      <div :class="type !== 'mobile' ? 'active' : ''" @click="changeType('pc')">
        <img v-show="type === 'mobile'" src="@/assets/img/approval/pc-n.png" alt="" />
        <img v-show="type !== 'mobile'" src="@/assets/img/approval/pc-a.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    choosed: {
      type: Number,
      default: -1
    }
  },

  data() {
    return {
      // type: 'mobile',
      type: 'pc'
    }
  },
  components: {
    draggable
  },

  methods: {
    changeType(params) {
      if (params === this.type) return
      this.type = params
    },
    // 插入新的或者排序
    insert(e) {
      // 排序和插入要触发事件，涉及到当前所选项问题
      this.$emit('sortList', e)
    },
    // 选择预览中的组件
    choose(e, index) {
      if (index === this.choosed) return
      if (e.target.className === 'del') return
      this.$emit('choosed', index)
    },
    del(index) {
      this.$emit('delete', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;

  .mobile {
    width: 404px;
    height: 737px;
    text-align: center;
    margin: 0 auto;
    background-image: url('../../../../../../assets/img/approval/phone.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    margin-bottom: 45px;

    .box {
      width: 368px;
      height: 640px;
      background-color: #eee;
      overflow-y: auto;

      .dragArea {
        width: 100%;
        min-height: 100%;
        padding: 12px 6px;
        background-color: #eee;

        .item {
          margin-bottom: 9px;
          border: 1px solid transparent;
          border-radius: 3px;
          font-size: 14px;
          position: relative;

          .del {
            position: absolute;
            right: 0;
            top: 0;
            width: 15px;
            height: 15px;
            background-color: #4c84ff;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .assets {
            background-color: #fff;
            padding: 18px 11px 10px;

            .title {
              color: #000;
              line-height: 14px;
              margin-bottom: 15px;
              text-align: left;
            }

            .assetsOptions {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 10px;

              .left {
                border: 1px solid #eee;
                line-height: 30px;
                width: 170px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 10px;
                border-radius: 3px;
              }

              .right {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .inputBox {
                  height: 30px;
                  border: 1px solid #eee;
                  border-radius: 3px;
                  margin-left: 10px;
                  width: 60px;
                }
              }
            }
          }

          .input {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px 0 11px;
            line-height: 50px;
            background-color: #fff;

            .title {
              color: #000000;
            }

            .tips {
              color: #ccc;
            }
          }

          .multInput {
            padding: 18px 11px 47px;
            text-align: left;
            background-color: #fff;

            .title {
              color: #000;
              line-height: 14px;
              margin-bottom: 15px;
            }

            .tips {
              color: #cccccc;
              line-height: 14px;
            }
          }

          .radio {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 11px 0 11px;
            line-height: 50px;
            background-color: #fff;

            .title {
              color: #000;
            }

            .options {
              display: flex;
              width: 70%;
              align-items: center;
              flex-wrap: wrap;

              .option {
                min-width: 40px;
                margin-left: 10px;
              }
            }
          }

          .multRadio {
            display: flex;
            padding: 0 11px;
            line-height: 50px;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;

            .title {
              color: #000;
            }

            .tips {
              color: #ccc;

              span {
                margin-right: 10px;
              }
            }
          }

          .assetReturn {
            padding: 0 15px 0 11px;
            line-height: 50px;
            background-color: #fff;
            .assetReturnItem {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          }

          .upload {
            padding: 19px 11px 12px;
            background-color: #fff;

            .title {
              display: flex;
              align-items: center;
              line-height: 14px;
              margin-bottom: 16px;

              .mainTitle {
                color: #000;
                margin-right: 7px;
              }

              .tips {
                color: #ccc;
                font-size: 12px;
              }
            }

            .upIcon {
              width: 47px;
              height: 47px;
              background-color: #ffffff;
              border-radius: 5px;
              border: solid 1px #bbbbbb;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          .tooltips {
            color: #ff8712;
            font-size: 12px;
            line-height: 24px;
            text-align: left;
          }

          .dateRange {
            .top,
            .bottom {
              display: flex;
              padding: 0 11px;
              line-height: 50px;
              justify-content: space-between;
              align-items: center;
              background-color: #fff;

              .title {
                color: #000;
              }

              .tips {
                color: #ccc;

                span {
                  margin-right: 10px;
                }
              }
            }

            .top {
              border-bottom: 1px solid #eee;
            }
          }
        }

        .item:hover {
          border-color: #4c84ff;
        }

        .active {
          border: 1px dotted #4c84ff;
        }
      }
    }
  }

  .pc {
    width: 600px;
    height: 600px;
    text-align: center;
    margin: 0 auto;
    background-image: url('../../../../../../assets/img/approval/pc.png');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;

    overflow-y: auto;
    margin-bottom: 45px;

    .box {
      width: 560px;
      height: 440px;
      background-color: #eee;
      overflow-y: auto;
      margin-top: 30px;

      .dragArea {
        width: 100%;
        min-height: 434px;
        border: 6px solid #eee;
        background-color: #fff;

        .item {
          position: relative;
          border: 1px solid transparent;
          width: 100%;
          font-size: 14px;
          line-height: 50px;

          .title {
            width: 25%;
            text-align: right;
          }

          .area {
            margin-left: 10px;
            width: 60%;
            border-radius: 3px;
            border: 1px solid #e5e5e5;
            color: #ccc;
            text-align: left;
            text-indent: 16px;
          }

          .input {
            display: flex;
            align-items: center;

            .area {
              height: 40px;
              display: flex;
              align-items: center;
            }
          }

          .textarea {
            display: flex;

            .area {
              height: 100px;
            }
          }

          .radio,
          .multRadio {
            display: flex;

            .area {
              border: none;
              display: flex;
              align-items: center;
              flex-wrap: wrap;

              label {
                color: #000;
                margin-left: 5px;
                cursor: pointer;
              }

              input {
                cursor: pointer;
              }
            }
          }

          .date {
            display: flex;
            align-items: center;

            .area {
              display: flex;
              height: 40px;
              align-items: center;
              justify-content: space-between;

              img {
                margin-right: 16px;
              }
            }
          }

          .dateRange {
            display: flex;
            align-items: center;

            .area {
              display: flex;
              align-items: center;
              justify-content: space-around;
              height: 40px;
            }
          }

          .upload {
            display: flex;
            padding: 5px 0;

            .area {
              width: 90px;
              height: 90px;

              .icon {
                font-size: 30px;
                margin-top: 20px;
                text-align: center;
              }

              .word {
                color: #969696;
                line-height: 20px;
              }
            }
          }

          .tooltips {
            display: flex;
            align-items: center;
            font-size: 12px;
            height: 30px;
            line-height: 30px;

            .area {
              border: none;
              color: #ff8712;
              text-indent: 0;
            }
          }
          .select {
            display: flex;
            align-items: center;

            .area {
              height: 40px;
              line-height: 40px;
              display: flex;
              justify-content: space-between;

              .icon {
                display: flex;
                align-items: center;
                padding-right: 16px;
              }
            }
          }

          .assets {
            display: flex;

            .assetsOptions {
              width: 60%;
              margin-left: 10px;

              .assetsItem {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .left {
                  width: 160px;
                  border: 1px solid #eee;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  border-radius: 3px;
                  padding: 0 10px;
                  color: #ccc;
                }

                .right {
                  display: flex;
                  align-items: center;

                  .inputBox {
                    border: 1px solid #eee;
                    border-radius: 3px;
                    width: 50px;
                    height: 40px;
                    margin-left: 10px;
                  }
                }
              }
            }
          }

          .assetReturn {
            // display: flex;
            // align-items: center;

            .assetReturnItem {
              display: flex;
              // justify-content: space-between;

              .left {
                width: 25%;
                text-align: right;
              }

              .right {
                margin-left: 10px;
                text-align: left;
              }
            }
          }

          .del {
            background-color: #4c84ff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: absolute;
            right: 0;
            top: 0;
            width: 15px;
            height: 15px;
            color: #fff;
          }
        }

        .item:hover {
          border-color: #4c84ff;
        }

        .active {
          border: 1px dotted #4c84ff;
        }
      }
    }
  }

  .type {
    position: absolute;
    top: 186px;
    left: 40px;
    width: 55px;
    height: 110px;
    background-color: #fff;

    div {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        width: 30px;
        height: 30px;
      }
    }

    .active {
      background-color: #4c84ff;
    }
  }
}
</style>
