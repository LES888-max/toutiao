<template>
  <div>
    <form action="/">
      <van-search
        v-model="keywords"
        background="#3296fa"
        show-action
        placeholder="请输入关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './SearchHistory'
import SearchResult from './SearchResult'
import SearchSuggestion from './SearchSuggestion'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      isShow: false
    }
  },
  computed: {
    componentName() {
      if (this.keywords.trim().length === 0) {
        return 'SearchHistory'
      } else if (this.isShow) {
        return 'SearchResult'
      } else {
        return 'SearchSuggestion'
      }
    }
  },
  methods: {
    onSearch() {
      console.log('搜索')
      this.isShow = true
    },
    onSearchFocus() {
      this.isShow = false
    }
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
