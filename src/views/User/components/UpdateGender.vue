<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index="gender"
    />
  </div>
</template>

<script>
import { updateGender } from '@/api'
export default {
  data() {
    return {
      columns: ['男', '女']
    }
  },
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  methods: {
    onCancel() {
      this.$parent.$parent.showGender = false
    },
    async onConfirm(value) {
      console.log(value)
      const gender = value === '男' ? '0' : '1'
      this.$toast.loading({
        message: '正在修改...',
        forbidClick: true
      })
      try {
        await updateGender(gender)
        this.$toast.success('修改成功')
        this.$emit('changeGender', Number(gender))
      } catch {
        this.$toast.fail('修改失败')
      }
      this.$parent.$parent.showGender = false
    }
  }
}
</script>

<style></style>
