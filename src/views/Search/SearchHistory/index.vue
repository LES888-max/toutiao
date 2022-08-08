<template>
  <div>
    <van-cell title="搜索历史">
      <i
        v-if="isShow"
        class="van-icon van-icon-delete-o"
        @click="isShow = false"
      ></i>
      <span v-else>
        <span @click="deleteAll">全部删除 </span>
        <span @click="isShow = true">完成</span>
      </span>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in history"
      :key="index"
      @click="choose(item, index)"
    >
      <i class="van-icon van-icon-close" v-if="!isShow"></i>
    </van-cell>
  </div>
</template>

<script>
import { setHISTORY } from '@/util/auth'
export default {
  data() {
    return {
      history: this.$store.state.history,
      isShow: true
    }
  },
  methods: {
    deleteAll() {
      this.history = []
      this.$store.commit('REMOVE_HISTORY')
    },
    choose(item, index) {
      if (!this.isShow) {
        this.history.splice(index, 1)
        setHISTORY(this.history)
        return
      }
      this.$emit('changeKeywords', item)
    }
  }
}
</script>

<style scoped lang="less"></style>
