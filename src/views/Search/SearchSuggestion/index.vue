<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in highLightSuggestions"
      :key="index"
      @click="choose(index)"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsApi } from '@/api'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggestion: []
    }
  },
  computed: {
    highLightSuggestions() {
      return this.suggestion.map((item) =>
        item.replace(
          new RegExp(this.keywords, 'ig'),
          (match) => `<span style="color: red">${match}</span>`
        )
      )
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSuggestion()
      }
    }
  },
  methods: {
    getSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionsApi(this.keywords)
        this.suggestion = data.data.options.filter(Boolean)
      } catch {
        this.$toast.fail('获取搜索资源失败')
      }
    }, 300),
    choose(index) {
      this.$emit('changeKeywords', this.suggestion[index])
    }
  }
}
</script>

<style></style>
