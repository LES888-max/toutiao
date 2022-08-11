<template>
  <div>
    <van-nav-bar
      class="reply"
      :title="item.reply_count === 0 ? '暂无评论' : item.reply_count + '条回复'"
      left-arrow
      @click-left="goback"
    />
    <comment-item :item="item" type="c"></comment-item>
    <van-cell title="全部回复" />
    <comment-list type="c" :source="item.com_id"></comment-list>
    <div class="post-warp">
      <van-button round @click="show = true">评论</van-button>
    </div>
    <van-popup v-model="show" position="bottom">
      <write-comment type="c" :comId="item.com_id"></write-comment>
    </van-popup>
  </div>
</template>

<script>
import CommentList from '@/components/CommentList'
import CommentItem from './CommentItem'
import WriteComment from '@/components/WriteComment'
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    WriteComment
  },
  methods: {
    goback() {
      this.$parent.$parent.showReply = false
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-nav-bar__content) {
  background-color: #fff;
  .van-nav-bar__title {
    color: #000 !important;
  }
  .van-icon {
    color: #000 !important;
  }
}
.post-warp {
  width: 100%;
  height: 1.33333rem;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  :deep(.van-button) {
    width: 640px;
    background-color: #3296fa;
    color: #fff;
  }
}
</style>
