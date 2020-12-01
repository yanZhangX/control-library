<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{ systemName }}</span>
      </div>
      <!-- 自定义电子表单控件 -->
      <div class="desc"></div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs v-model="tabsKey" size="large" :tabBarStyle="{ textAlign: 'center' }" style="padding: 0 2px;">
          <a-tab-pane tab="登录" :key="1">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="请输入登录手机号"
                v-decorator="['userPhone', { rules: [{ required: true, message: '请输入登录手机号', whitespace: true }] }]"
              >
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="请输入密码"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', { rules: [{ required: true, message: '请输入密码', whitespace: true }] }]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <!-- <a-tab-pane tab="注册" :key="2">
            <a-form-item>
              <a-input autocomplete="autocomplete" size="large" placeholder="请输入手机号" v-decorator="['userPhone', { rules: [{ required: true, message: '请输入手机号', whitespace: true }] }]">
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item v-if="tabsKey === 2">
              <a-input size="large" placeholder="请输入用户名" v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名', whitespace: true }] }]">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="请输入密码"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', { rules: [{ required: true, message: '请输入密码', whitespace: true }] }]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane> -->
        </a-tabs>
        <div>
          <a-checkbox :checked="true">自动登录</a-checkbox>
          <!-- <a style="float: right">忘记密码</a> -->
        </div>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit" type="primary">登录</a-button>
        </a-form-item>
        <div>
          <!-- 其他登录方式 -->
          <!-- <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" /> -->
          <!-- <router-link style="float: right" to="/dashboard/workplace">注册账户</router-link> -->
        </div>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import { registerUser, loginUser } from '@/service'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this),
      tabsKey: 1
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit(e) {
      const { tabsKey, form } = this
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const { userName, userPhone, password } = { userName: form.getFieldValue('userName'), userPhone: form.getFieldValue('userPhone'), password: form.getFieldValue('password') }
          if (tabsKey === 2) {
            console.log({ userName, userPhone, password })
            registerUser({ userName, userPhone, password }).then((res) => {
              this.tabsKey = 1
              this.logging = false
            })
            return false
          }
          loginUser({ userPhone, password })
            .then(this.afterLogin)
            .finally((this.logging = false))
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      this.$router.push({ path: '/' })
      /*
      const loginRes = res.data
      if (loginRes.code >= 0) {
        const { user, permissions, roles } = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
      } else {
        this.error = loginRes.message
      }
      */
    }
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: rgba(0, 0, 0, 0.85);
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
    .icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.45);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #0090ff;
      }
    }
  }
}
</style>
