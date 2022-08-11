<template>
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
    @click="goDetail(articleInfo.art_id)"
  />
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :label="label"
    @click="goDetail(articleInfo.art_id)"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>
  <van-cell v-else @click="goDetail(articleInfo.art_id)">
    <template #title>
      <span>{{ articleInfo.title }}</span>
      <div class="img-box">
        <van-image
          v-for="(item, index) in articleInfo.cover.images"
          :key="index"
          width="100"
          height="100"
          :src="item"
        />
      </div>
      <span class="label">{{ label }}</span>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: 'detail',
        params: {
          id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-cell__value) {
  display: block;
}
:deep(.van-cell__title) {
  .img-box {
    display: flex;
    justify-content: space-between;
  }
  .label {
    margin-top: 0.10667rem;
    color: #969799;
    font-size: 0.32rem;
    line-height: 0.48rem;
  }
}
</style>
