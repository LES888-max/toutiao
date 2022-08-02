<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            round
            size="mini"
            class="code-btn"
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 0.42666rem">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCodeAPI } from '@/api'
import { mobileRules, codeRules } from './rules'
export default {
  data() {
    return {
      isShowCode: true,
      mobile: '',
      code: '',
      mobileRules,
      codeRules
    }
  },
  methods: {
    async onSubmit() {
      this.loading()
      try {
        const {
          data: { data }
        } = await login(this.mobile, this.code)
        this.$toast.success('登陆成功')
        this.$router.push('/my')
        this.$store.commit('SET_TOKEN', data)
      } catch (e) {
        let message = '请重新登录'
        if (e.response.status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.form.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCodeAPI(this.mobile)
          this.$toast.success('获取验证码成功')
          this.isShowCode = false
        } catch (e) {
          const status = e.response.status
          let message = '获取验证码败'
          if (status === 404) {
            message = '手机号不正确'
          } else if (status === 429) {
            message = e.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    },
    loading() {
      this.$toast.loading({
        message: '加载中',
        forbidClick: true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .toutiao {
    font-size: 40px;
  }
  .van-field__label {
    flex: 0.05;
  }
}
.code-btn {
  padding: 0 0.2rem;
  color: #a9929b;
  background-color: #eee;
}
</style>
