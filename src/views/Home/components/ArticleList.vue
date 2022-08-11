<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新文章成功"
    >
      <van-list
        @load="loadNextPageArticle"
        v-model="loading"
        :offset="0"
        :immediate-check="false"
        :finished="isFinished"
        finished-text="没有更多文章了~"
        :error.sync="error"
        error-text="加载文章失败，请重新点击加载"
      >
        <article-item
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem'
import { getArticleAPI } from '@/api'

export default {
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: false
    }
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请刷新重新获取文章！')
      }
    },
    async loadNextPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        if (data.data.pre_timestamp == null) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        this.pre_timestamp = data.data.pre_timestamp
        this.loading = false
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  components: {
    ArticleItem
  }
}
</script>

<style></style>
