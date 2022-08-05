<template>
  <div class="channel">
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        :icon="isShow(item.name)"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      />
    </van-grid>
    <van-cell title="推荐频道" />
    <van-grid gutter="0.266rem" direction="horizontal">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        @click="$emit('add-channel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels as getAllChannelsApi } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(
        (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
      )
    }
  },
  methods: {
    isShow(name) {
      if (this.isEdit && name !== '推荐') {
        return 'close'
      } else {
        return ''
      }
    },
    async getAllChannels() {
      const { data } = await getAllChannelsApi()
      this.allChannels = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        if (item.name === '推荐') return
        this.$emit('del-channel', item.id)
      } else {
        this.$parent.$parent.show = false
        this.$emit('change-active', index)
      }
    }
  },
  created() {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.333333333rem;
  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  :deep(.van-grid-item__icon) {
    font-size: 30px;
  }
  :deep(.mychannel-item) {
    .van-grid-item__icon {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(20%, -20%);
      z-index: 99;
    }
    .van-grid-item__icon + .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
