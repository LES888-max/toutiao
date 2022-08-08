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
        @cancel="$router.back()"
      />
    </form>
    <component
      :is="componentName"
      :keywords="keywords"
      @changeKeywords="goSearch"
    ></component>
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
      this.isShow = true
    },
    onSearchFocus() {
      this.isShow = false
    },
    goSearch(value) {
      this.keywords = value
      this.onSearch()
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
