<template>
  <div class="container">
    <van-nav-bar title="黑马头条" left-arrow @click-left="$router.push('/ ')" />
    <div class="warp">
      <h1 class="title">{{ detail.title }}</h1>
      <van-cell class="user-info">
        <template #icon>
          <van-image
            :src="detail.aut_photo"
            round
            width="1rem"
            height="1rem"
            class="avatar"
          />
        </template>
        <template #title>
          <div class="user-name">{{ detail.aut_name }}</div>
          <div class="publish-date">{{ detail.pubdate }}</div>
        </template>
        <van-button
          round
          :type="detail.is_followed ? 'default' : 'info'"
          :icon="detail.is_followed ? '' : 'plus'"
          size="mini"
          @click="following"
          :loading="loading"
        >
          {{ detail.is_followed ? '已关注' : '关注' }}</van-button
        >
      </van-cell>
      <div
        class="markdown-body"
        ref="articleContent"
        v-html="detail.content"
      ></div>
      <van-divider>正文结束</van-divider>
      <article-comments
        :source="$route.params.id"
        type="a"
        v-if="!showReply"
      ></article-comments>
    </div>
    <div class="article-buttom">
      <van-button round size="mini" @click="showWAC = true">写评论</van-button>
      <van-icon
        :color="iconColor"
        name="comment-o"
        :badge="detail.comm_count"
      />
      <van-icon
        :color="detail.is_collected ? '#3296fa' : iconColor"
        :name="detail.is_collected ? 'star' : 'star-o'"
        @click="collecting"
      />
      <van-icon
        :color="detail.attitude === 1 ? 'red' : iconColor"
        :name="detail.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="liking"
      />
      <van-icon :color="iconColor" name="share" />
    </div>
    <van-popup v-model="showWAC" position="bottom">
      <write-article-comment type="a"></write-article-comment>
    </van-popup>
    <van-popup
      v-model="showReply"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <reply-comment :item="item" v-if="showReply"></reply-comment>
    </van-popup>
  </div>
</template>

<script>
import ReplyComment from '@/components/ReplyComment'
import WriteArticleComment from '@/components/WriteComment'
import ArticleComments from '@/components/CommentList'
import { ImagePreview } from 'vant'
import {
  getArticleDetailsAPI,
  followUser,
  unFollowUser,
  collectionArticle,
  unCollectionArticle,
  likeArticle,
  unLikeArticle
} from '@/api'

export default {
  name: 'Detail',
  data() {
    return {
      detail: {},
      iconColor: 'rgb(119,119,119)',
      loading: false,
      showWAC: false,
      showReply: false,
      item: {}
    }
  },
  components: {
    ArticleComments,
    WriteArticleComment,
    ReplyComment
  },
  methods: {
    dealImg() {
      const DOM = this.$refs.articleContent
      const imgs = DOM.querySelectorAll('img')
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    async getDetail() {
      const id = this.$route.params
      const {
        data: { data }
      } = await getArticleDetailsAPI(id.id)
      this.detail = data
      this.$nextTick(() => {
        this.dealImg()
      })
    },
    async followed() {
      this.loading = true
      try {
        await followUser(this.detail.aut_id)
        this.detail.is_followed = true
        this.$toast('关注成功')
      } catch {
        this.$toast('关注失败')
      }
      this.loading = false
    },
    async unfollow() {
      this.loading = true
      try {
        await unFollowUser(this.detail.aut_id)
        this.detail.is_followed = false
        this.$toast('取消关注成功')
      } catch {
        this.$toast('取消关注失败')
      }
      this.loading = false
    },
    following() {
      if (this.detail.is_followed) {
        this.unfollow()
      } else {
        this.followed()
      }
    },
    async collection() {
      try {
        await collectionArticle(this.detail.art_id)
        this.$toast('收藏成功')
        this.detail.is_collected = true
      } catch {
        this.$toast('收藏失败')
      }
    },
    async unCollection() {
      try {
        await unCollectionArticle(this.detail.art_id)
        this.$toast('取消收藏成功')
        this.detail.is_collected = false
      } catch {
        this.$toast('取消收藏失败')
      }
    },
    collecting() {
      if (this.detail.is_collected) {
        this.unCollection()
      } else {
        this.collection()
      }
    },
    async like() {
      try {
        await likeArticle(this.detail.art_id)
        this.$toast('点赞成功')
        this.detail.attitude = 1
      } catch {
        this.$toast('点赞失败')
      }
    },
    async unLike() {
      try {
        await unLikeArticle(this.detail.art_id)
        this.$toast('取消点赞成功')
        this.detail.attitude = -1
      } catch {
        this.$toast('取消点赞失败')
      }
    },
    liking() {
      if (this.detail.attitude === 1) {
        this.unLike()
      } else {
        this.like()
      }
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {
    this.$bus.$on('changeItem', (value) => {
      this.item = value
      this.showReply = true
    })
    this.$bus.$on('addReplyComment', () => {
      this.item.reply_count += 1
    })
  }
}
</script>

<style scoped lang="less">
.container {
  background-color: #fff;
}
:deep(.van-nav-bar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.warp {
  max-height: calc(100vh - 88px - 88px);
  font-size: 12px;
  overflow: auto;
  .title {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
  :deep(.user-info) {
    &.van-cell::after {
      border: 0;
    }
    padding: 0 0.42667rem;
    align-items: center;
    .user-name {
      font-size: 12px;
      color: #3a3a3a;
      line-height: 30px;
    }
    .publish-date {
      font-size: 12px;
      color: #b7b7b7;
      line-height: 30px;
    }
    .avatar {
      margin-right: 20px;
    }
    .van-button {
      width: 2rem;
      height: 0.75rem;
    }
  }
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 0.73333rem 0.42667rem;
    }
  }
}
:deep(.article-buttom) {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 1.17333rem;
  border-top: 0.01333rem solid #d8d8d8;
  background-color: #fff;
  .van-button {
    width: 282px;
    .van-button__content {
      color: #a7a7a7;
      font-size: 0.4rem;
    }
  }
  .van-icon {
    font-size: 40px;
  }
}
</style>
