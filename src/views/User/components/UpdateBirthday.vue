<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { updateBirthday } from '@/api'
export default {
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date()
    }
  },
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  computed: {
    currentDate: {
      get() {
        const arr = this.birthday.split('-')
        arr[1] -= 1
        return new Date(...arr)
      },
      set(value) {}
    }
  },
  methods: {
    dealBirthday(value) {
      let birthday = new Date(value)
      const year = birthday.getFullYear()
      const month = birthday.getMonth() + 1
      const day = birthday.getDate()
      birthday = year + '-' + month + '-' + day
      return birthday
    },
    async onConfirm(value) {
      const birthday = this.dealBirthday(value)
      this.$toast.loading({
        message: '正在修改...',
        forbidClick: true
      })
      try {
        await updateBirthday(birthday)
        this.$toast.success('修改成功')
        this.$emit('changeBirthday', birthday)
      } catch {
        this.$toast.fail('修改失败')
      }
      this.$parent.$parent.showBirthday = false
    },
    onCancel() {
      this.$parent.$parent.showBirthday = false
    }
  }
}
</script>

<style></style>
