<template>
  <div>
    <van-cell>
      <template #icon>
        <van-image width="1rem" height="1rem" :src="item.aut_photo" round />
      </template>
      <template #title>
        <div class="title">
          <div class="username">{{ item.aut_name }}</div>
          <van-button icon="good-job-o" size="mini" class="like">
            赞
          </van-button>
        </div>
        <p class="comment-content">{{ item.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{ item.pubdate }}</span>
          <van-button
            v-if="type === 'a'"
            size="mini"
            round
            class="reply"
            @click="$bus.$emit('changeItem', item)"
            >回复{{ item.reply_count }}</van-button
          >
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  data() {
    return {
      show: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({})
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.van-image {
  margin-right: 0.33333rem;
}
.like {
  border: 1px solid #fff;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.comment-content {
  font-size: 32px;
  color: #222;
  word-break: break-all;
  text-align: justify;
}
.bottom-info {
  display: flex;
  align-items: center;
  .comment-pubdate {
    font-size: 0.25333rem;
    color: #222;
    margin-right: 0.33333rem;
  }
  .reply {
    width: 134px;
  }
}
</style>
