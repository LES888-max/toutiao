<template>
  <div>
    <van-nav-bar
      title="更改名称"
      left-text="取消"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <textarea
      placeholder="请输入新的昵称"
      :value="userName"
      @change="inputFn"
    ></textarea>
    <p>
      <span v-text="userName.length"></span>
      /11
    </p>
  </div>
</template>

<script>
import { updateNickName } from '@/api'
export default {
  data() {
    return {
      userName: this.nickName
    }
  },
  props: {
    nickName: {
      type: String,
      required: true
    }
  },
  computed: {},
  methods: {
    onClickLeft() {
      this.$parent.$parent.showName = false
    },
    async onClickRight() {
      this.$toast.loading({
        message: '正在修改...',
        forbidClick: true
      })
      try {
        await updateNickName(this.userName)
        this.$toast.success('修改成功')
        this.$emit('changeName', this.userName)
        this.$parent.$parent.showName = false
      } catch {
        this.$toast.fail('修改失败')
      }
    },
    inputFn(e) {
      this.userName = e.target.value.substring(0, 11)
      e.target.value = this.userName
    }
  }
}
</script>

<style scoped lang="less">
textarea {
  display: block;
  width: 100%;
  border: 0;
  font-size: 14px;
  margin: 20px 32px;
  min-height: 1.6rem;
  color: #323233;
  ::placeholder {
    color: #ccc;
  }
}
p {
  text-align: right;
  font-size: 12px;
  color: #646566;
  padding-right: 32px;
}
</style>
