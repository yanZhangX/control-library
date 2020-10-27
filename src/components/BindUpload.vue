<template>
  <div class="bind-upload">
    <draggable tag="ul" class="img-list" v-model="list" handle=".can-draggable">
      <li v-for="(item, index) in list" :key="index" class="allow-drag">
        <div class="img-wrapper can-draggable">
          <img :src="item.url" class="img" alt="图片已失效" />
          <!-- <span class="success" v-show="showSuccess(item)">
            <a-icon type="check"></a-icon>
          </span> -->
          <div class="img-action">
            <span class="preview" ref="uploadDom" v-viewer @click="onClickPreview($event, 'uploadDom', list, item, index)">
              <a-icon type="eye"></a-icon>
            </span>
            <span class="delete" v-if="onRemove" @click.stop="onClickRemove(item)">
              <a-icon type="delete"></a-icon>
            </span>
          </div>
        </div>
        <div v-if="pictureExplan">
          <a-input v-model="item.code" :placeholder="inplaceholder" class="inp-explan"></a-input>
        </div>
      </li>
      <li v-if="addable && list.length < limit" class="img-wrapper input-wrapper">
        <input :multiple="multiple" type="file" class="add" @change="fileChange" />
        <div class="add-btn">
          <a-icon type="plus"></a-icon>
          <span>上传</span>
        </div>
      </li>
    </draggable>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import draggable from 'vuedraggable'
import { getToken, http, uploadImgUrl } from '@/util'
const noop = () => {}
export default {
  name: 'bindUpload',
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      imgList: []
    }
  },
  components: {
    draggable
  },
  props: {
    action: {
      type: String,
      default: uploadImgUrl
    },
    headers: Object,
    data: Object,
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png,.JPG,.PNG,.gif,.GIF'
    },
    onPreview: {
      type: Function,
      default: noop
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    onRemove: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    multiple: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number | String,
      default: Number.MAX_VALUE
    },
    addable: {
      type: Boolean,
      default: true
    },
    pictureExplan: {
      type: Boolean,
      default: false
    },
    inplaceholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    list: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleCancel() {
      this.previewVisible = false
    },
    showSuccess(item = {}) {
      let url = item.url || ''
      return /^http/.test(url)
    },
    onClickPreview(event, ref, list, item, index) {
      this.$emit('preview', { list, index })
      this.onPreview(item, this.list)
    },
    onClickRemove(item) {
      this.list = _.without(this.list, item)
      this.onRemove(item, this.list)
    },
    fileChange(e) {
      let files = e.target.files || []
      const _this = this
      let list = this.list
      // 检查file类型
      // if (this.accept) {
      //   let accept = this.accept
      //   if (/\*/.test(this.accept)) { return this.$messageSend.error('暂不支持accept *') }
      //   const regStr = accept.replace(/\./g, '').replace(/,/g, '|')
      //   const reg = new RegExp(`(${regStr})+`, 'gi')
      //   let hasInvalidFile = _.some(files, file => {
      //     return !reg.test(file.type)
      //   })
      //   if (hasInvalidFile) {
      //     return this.$messageSend.error('请检查您的文件类型')
      //   }
      // }
      _.each(files, (file) => {
        if (list.length >= Number(_this.limit)) return
        let obj = {
          url: window.URL.createObjectURL(file),
          raw: file
        }
        list.push(obj)
        if (this.autoUpload) {
          this._upload(obj)
        }
      })
      this.list = list
      e.target.value = ''
    },
    _upload(obj) {
      let file = obj.raw
      // 以formData的形式上传图片
      let options = { headers: { 'Content-Type': 'multipart/form-data', Authorization: getToken() } }
      // 生成formData
      let formData = new FormData()
      formData.append('fileType', 1)
      formData.append('file', file)
      if (this.data) {
        Object.keys(this.data).forEach((key) => {
          formData.append(key, this.data[key])
        })
      }
      // 处理header
      if (this.headers) {
        for (let item in this.headers) {
          if (this.headers.hasOwnProperty(item) && this.headers[item] !== null) {
            options.headers[item] = this.headers[item]
          }
        }
      }
      http
        .post(this.action, formData, options)
        .then((res = {}) => {
          const { url = '' } = res
          if (url) {
            obj.url = url
          } else {
            this.list = _.without(this.list, obj)
          }
        })
        .catch((e) => {
          this.list = _.without(this.list, obj)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.bind-upload {
  .img-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    li {
      list-style: none;
    }
  }
  .img-wrapper {
    margin: 0 8px 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 104px;
    height: 104px;
    line-height: 104px;
    background-color: #fbfdff;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    padding: 8px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    .success {
      position: absolute;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      line-height: 1;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
      i {
        color: #fff;
        font-size: 12px;
        margin-top: 11px;
        transform: rotateZ(-45deg);
      }
    }
    img {
      position: static;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.8;
    }
    &.input-wrapper {
      line-height: 104px;
      vertical-align: top;
      background-color: #fafafa;
      border: 1px dashed #d9d9d9;
      text-align: center;
      &:hover {
        border-color: #409eff;
        /* color: #409eff; */
      }
      /*i {*/
      /*  font-size: 28px;*/
      /*  color: #8c939d;*/
      /*}*/
      input {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
      }
    }
    .img-action {
      position: absolute;
      width: 86px;
      height: 86px;
      left: 8px;
      top: 8px;
      cursor: default;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      &:hover {
        opacity: 1;
      }
      span {
        display: inline-block;
        cursor: pointer;
        font-size: 16px;
        & + span {
          margin-left: 10px;
        }
      }
    }
  }
  .add-btn {
    height: 42px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    span {
      line-height: 1.5;
      font-size: 14px;
    }
  }
  .inp-explan {
    width: 104px;
    height: 36px;
  }
  /*.input-wrapper{*/
  /*display: inline-block;*/
  /*width: 148px;*/
  /*height: 148px;*/
  /*line-height: 104px;*/
  /*vertical-align: top;*/
  /*box-sizing: border-box;*/
  /*border: 1px dashed #c0ccda;*/
  /*background-color: #fbfdff;*/
  /*border-radius: 6px;*/
  /*text-align: center;*/
  /*margin: 0 10px 10px 0;*/
  /*position: relative;*/
  /*&:hover{*/
  /*border-color: #409eff;*/
  /*color: #409eff;*/
  /*}*/
  /*i{*/
  /*font-size: 28px;*/
  /*}*/
  /*input{*/
  /*position: absolute;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*left: 0;*/
  /*top: 0;*/
  /*opacity: 0;*/
  /*}*/
  /*}*/
}
</style>
