<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      @load="onload"
      finished-text="没有跟多了"
      offset="0"
    >
      <van-cell
        :title="item.title"
        v-for="(item, index) in results"
        :key="index"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultsApi } from '@/api'
export default {
  data() {
    return {
      results: [],
      finished: false,
      loading: false,
      page: 1
    }
  },
  watch: {
    keywords() {
      this.page = 1
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  methods: {
    async getSearchResults() {
      const {
        data: {
          data: { results }
        }
      } = await getSearchResultsApi(this.keywords, this.page)
      return results
    },
    onload() {
      this.page += 1
      this.getSearchResults().then((res) => {
        if (res.length === 0) {
          this.loading = false
          this.finished = true
          return
        }
        this.results.push(...res)
      })
      this.loading = false
    }
  },
  created() {
    this.$store.commit('SET_HISTORY', this.keywords)
    this.getSearchResults().then((res) => {
      this.results = res
    })
  }
}
</script>

<style></style>
