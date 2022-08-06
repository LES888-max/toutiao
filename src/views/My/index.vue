<template>
  <div>
    <header>
      <div v-if="isLogin">
        <div class="user-info">
          <div class="left">
            <img :src="userMessage.photo" />
            <span>{{ userMessage.name }}</span>
          </div>
          <div class="right">
            <van-button round size="mini" @click="$router.push('/user')"
              >编辑资料</van-button
            >
          </div>
        </div>
        <van-grid :border="false">
          <van-grid-item text="头条">
            <template #icon>
              <span>{{ userMessage.art_count }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="粉丝">
            <template #icon>
              <span>{{ userMessage.fans_count }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="关注">
            <template #icon>
              <span>{{ userMessage.follow_count }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="获赞">
            <template #icon>
              <span>{{ userMessage.like_count }}</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div v-else class="noLogin">
        <img src="../../assets/images/mobile.png" alt="" />
        <span @click="$router.push('/login')">登录/注册</span>
      </div>
    </header>
    <main>
      <div>
        <van-grid clickable :column-num="2">
          <van-grid-item text="收藏">
            <template #icon>
              <i class="toutiao toutiao-shoucang"></i>
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <i class="toutiao toutiao-lishi"></i>
            </template>
          </van-grid-item>
        </van-grid>
        <div style="margin-top: 0.13rem">
          <van-cell title="消息通知" is-link />
          <van-cell title="小智同学" is-link />
        </div>
      </div>
    </main>
    <footer v-if="isLogin" @click="logout"><button>退出</button></footer>
  </div>
</template>

<script>
import { getUserMessage } from '@/api'
export default {
  data() {
    return {
      userMessage: {}
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    },
    async getUserMessage() {
      const {
        data: { data }
      } = await getUserMessage()
      this.userMessage = data
      console.log(this.userMessage)
    }
  },
  created() {
    if (this.isLogin) {
      this.getUserMessage()
    }
  }
}
</script>

<style scoped lang="less">
header {
  width: 10rem;
  height: 5.34667rem;
  background-image: url(../../assets/images/banner.png);
  background-size: 100% 100%;
  overflow: hidden;
  .noLogin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    img {
      width: 1.76rem;
      height: 1.76rem;
    }
    span {
      font-size: 28px;
      color: #fff;

      margin-top: 10px;
    }
  }
  :deep(.van-grid) {
    .van-grid-item__content {
      background-color: transparent;
    }
  }
  .user-info {
    width: 100%;
    height: 1.76rem;
    margin-top: 1.54667rem;
    padding: 0 0.42667rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      img {
        display: inline-block;
        width: 1.76rem;
        height: 1.76rem;
        border-radius: 50%;
        border: 0.01333rem solid #fff;
      }
      span {
        font-size: 0.4rem;
        color: #fff;
        margin-left: 0.29333rem;
      }
    }
    .right {
      height: 90px;
      .van-button {
        height: 32px;
        color: #666;
      }
    }
  }
  :deep(.van-grid) {
    color: #fff;
    .van-grid-item__icon-wrapper {
      span {
        font-size: 0.34667rem;
        margin-bottom: 0.10667rem;
      }
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
.toutiao {
  font-size: 46px;
  &.toutiao-shoucang {
    color: #eb5253;
  }
  &.toutiao-lishi {
    color: #ff9d1d;
  }
}
footer {
  button {
    display: block;
    width: 100%;
    margin-top: 10px;
    background-color: #fff;
    border: 0;
    height: 88px;
    font-size: 14px;
    color: red;
  }
}
</style>
