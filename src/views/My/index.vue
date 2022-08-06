<template>
  <div>
    <header>
      <div v-if="isLogin">
        登录后的盒子
        <button @click="$router.push('/user')">个人信息</button>
      </div>
      <div v-else>
        未登录的盒子
        <button @click="$router.push('/login')">登录</button>
      </div>
    </header>
    <main>
      <div>收藏、历史、消息通知、小智同学</div>
    </main>
    <footer v-if="isLogin" @click="logout"><button>退出</button></footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
