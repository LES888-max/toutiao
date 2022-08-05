<template>
  <div>
    <!-- 头部搜索 -->

    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          class="search-btn"
          round
          icon="search"
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 文章 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name"
        ><article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-popup
        :myChannels="myChannels"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-popup>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/ArticleList'
import {
  getMyChannel as getMyChannelApi,
  delChannel,
  addChannel,
  getMyChannelsByLocal,
  setMyChannelsToLocal
} from '@/api'
import ChannelPopup from '@/components/ChannelPopup'
export default {
  name: 'Home',
  data() {
    return {
      active: 2,
      myChannels: [],
      show: false
    }
  },
  components: {
    ArticleList,
    ChannelPopup
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    async getMyChannel() {
      try {
        const { data } = await getMyChannelApi()
        this.myChannels = data.data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败,请刷新')
      }
    },
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道',
        forbidClick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannel(id)
        } else {
          setMyChannelsToLocal(newChannels)
        }
        this.myChannels = newChannels
        this.$toast.success('删除成功')
      } catch (e) {
        this.$toast.fail('删除失败')
      }
    },
    async addChannel(item) {
      this.$toast.loading({
        message: '正在添加频道',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(item.id, this.myChannels.length)
        } else {
          setMyChannelsToLocal([...this.myChannels, item])
        }
        this.myChannels.push(item)
        this.$toast.success('添加成功')
      } catch (e) {
        this.$toast.fail('添加失败')
      }
    },
    initMyChannel() {
      if (this.isLogin) {
        this.getMyChannel()
      } else {
        const myChannels = getMyChannelsByLocal()
        if (myChannels) {
          this.myChannels = myChannels
        } else {
          this.getMyChannel()
        }
      }
    }
  },
  created() {
    this.initMyChannel()
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: sticky;
  top: 0;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 80px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  position: fixed;
  top: 92px;
  right: 0;
  z-index: 99;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  padding-bottom: 100px;
  max-height: calc(100vh - 92px - 88px - 100px);
  overflow: auto;
}
:deep(.van-grid-item__content--horizontal
    .van-grid-item__icon
    + .van-grid-item__text) {
  margin-left: -0.01rem;
}
</style>
