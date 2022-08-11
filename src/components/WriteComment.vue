<template>
  <div class="comment-post">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="sendbtn">发布</van-button>
  </div>
</template>

<script>
import { sendArticleComment } from '@/api'
export default {
  data() {
    return {
      message: ''
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    comId: {
      type: String,
      default: ''
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async sAC() {
      this.loading()
      const data = {}
      data.target = this.$route.params.id
      data.content = this.message
      try {
        const {
          data: {
            data: { new_obj: value }
          }
        } = await sendArticleComment(data)
        this.$bus.$emit('addComment', value, 'a')
        this.$toast.success('成功')
      } catch {
        this.$toast.fail('失败')
      }
    },
    async sUC() {
      this.loading()
      const data = {}
      data.target = this.comId
      data.content = this.message
      data.art_id = this.$route.params.id
      try {
        const {
          data: {
            data: { new_obj: value }
          }
        } = await sendArticleComment(data)
        this.$bus.$emit('addComment', value, 'c')
        this.$bus.$emit('addReplyComment')
        this.$toast.success('成功')
      } catch {
        this.$toast.fail('失败')
      }
    },
    sendbtn() {
      if (this.type === 'a') {
        this.sAC()
      } else if (this.type === 'c') {
        this.sUC()
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  .van-cell {
    background-color: #f5f7f9;
  }
}
:deep(.van-button) {
  &.post-btn {
    width: 2rem;
    border: none;
    padding: 0;
    color: #6ba3d8;
  }
}
</style>
