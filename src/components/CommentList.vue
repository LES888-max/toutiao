<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :loading="loading"
      :offset="5"
      @load="onload"
      :immediate-check="false"
    >
      <comment-item
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        :type="type"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
import { getComments } from '@/api'
export default {
  data() {
    return {
      commentList: [],
      finished: false,
      loading: false,
      params: {
        type: this.type,
        source: this.source
      },
      id: ''
    }
  },
  props: {
    source: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    CommentItem
  },
  methods: {
    async getCommentList() {
      const {
        data: { data }
      } = await getComments(this.params)
      this.id = data.last_id
      this.commentList = data.results
      if (data.last_id === null) {
        this.finished = true
      }
    },
    async onload() {
      this.params.offset = this.id
      const {
        data: { data }
      } = await getComments(this.params)
      this.commentList.push(...data.results)
      this.id = data.last_id
      this.loading = false
      console.log(this.id)
      if (this.id === null) {
        this.finished = true
        this.loading = false
      }
    }
  },
  mounted() {
    this.$bus.$on('addComment', (value, type) => {
      if (this.type === type) {
        this.commentList.unshift(value)
      } else if (this.type === type) {
        this.commentList.unshift(value)
      }
    })
  },
  created() {
    this.getCommentList()
  }
}
</script>

<style></style>
