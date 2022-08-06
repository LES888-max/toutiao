<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <!-- 用户信息 -->
      <!-- input:file的属性 -->
      <!-- accept: 显示file选择的文件后缀名（多个用逗号隔开） -->
      <!-- hidden：隐藏input:file -->
      <input type="file" hidden ref="file" @change="selectPhoto" />
    </van-cell>
    <van-popup
      v-model="isShow"
      :style="{ height: '100%', width: '100%' }"
      closeable
      class="avator-popup"
    >
      <update-avator
        :photo="photo"
        v-if="isShow"
        @update-avator="userInfo.photo = $event"
      ></update-avator>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvator from './components/UpdateAvator'
import { getUserInfo } from '@/api'
import { resolveToBase64 } from '@/util/resolveToBase64'
export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo: [],
      isShow: false,
      photo: ''
    }
  },
  components: {
    UpdateAvator
  },
  methods: {
    async getUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data.data
    },
    async selectPhoto(e) {
      const file = e.target.files[0]
      // 1. 获取file对象  --> e.target.files
      // 2. 把file对象转成img的src可识别的格式
      //    - objectUrl  --> URL.createObjectUrl(file对象)
      // - 缺点: 内存泄露  因为跟document绑定在一起
      // - 优点: 写法简单
      //    - Base64   --> FileReader(读文件对象)
      // - fr.readAsDataURL(file)
      // - fr.onload = (e)=>{  e.target.result  }
      // 第一种
      // const url = window.URL.createObjectURL(file)
      // this.photo = url
      // e.target.value = ''
      // this.isShow = true
      // 第二种
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   this.photo = e.target.result
      //   e.target.value = ''
      //   this.isShow = true
      // }
      const url = await resolveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.isShow = true
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
