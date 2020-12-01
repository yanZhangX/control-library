<!--
 * @Date: 2020-07-13 14:31:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-29 16:17:46
 * @FilePath: /ll-web-administration/src/modules/administration/pages/approval/components/FormDesign/Comps.vue
-->
<template>
  <div class="comps">
    <span>{{ data.name }}</span>
    <img v-if="data.tag === 'input'" src="@/assets/img/approval/single-input.png" alt="" srcset="" />
    <img v-if="data.tag === 'textarea'" src="@/assets/img/approval/multi-input.png" alt="" srcset="" />
    <img v-if="data.tag === 'input-number'" src="@/assets/img/approval/num-input.png" alt="" srcset="" />
    <img v-if="data.tag === 'radio'" src="@/assets/img/approval/single-check.png" alt="" srcset="" />
    <img v-if="data.tag === 'radio-group'" src="@/assets/img/approval/multi-check.png" alt="" srcset="" />
    <img v-if="data.tag === 'date'" src="@/assets/img/approval/single-date.png" alt="" srcset="" />
    <img v-if="data.tag === 'range-date'" src="@/assets/img/approval/multi-date.png" alt="" srcset="" />
    <img v-if="data.tag === 'pic'" src="@/assets/img/approval/upload-pic.png" alt="" srcset="" />
    <img v-if="data.tag === 'tooltips'" src="@/assets/img/approval/ps-word.png" alt="" srcset="" />
    <img v-if="data.tag === 'file'" src="@/assets/img/approval/upload-file.png" alt="" srcset="" />
    <img v-if="data.tag === 'address'" src="@/assets/img/approval/select-address.png" alt="" srcset="" />
    <img v-if="data.tag === 'select'" src="@/assets/img/approval/second-select.png" alt="" srcset="" />
    <img v-if="data.tag === 'location'" src="@/assets/img/approval/location.png" alt="" srcset="" />
    <img v-if="data.tag === 'data-select'" src="@/assets/img/approval/data-select.png" alt="" srcset="" />
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.comps {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 40%;
  min-width: 140px;
  box-sizing: border-box;
  padding: 10px 10px;
  border-radius: 5px;
  border: solid 1px #eeeeee;
  cursor: pointer;
  margin-bottom: 10px;
  background-color: #fff;

  span {
    white-space: nowrap;
  }
}

.comps:hover {
  border: 1px solid #4c84ff;
}
</style>
