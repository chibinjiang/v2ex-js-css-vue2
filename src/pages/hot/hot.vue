<template>
  <view class="index">
    <thread-list :threads="threads" :loading="loading"/>
  </view>
</template>

<script>
import Vue from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/api.js'
import ThreadList from '../../components/thread_list'

export default {
  name: "hot",
  components: {'thread-list': ThreadList},
  data(){
    return {loading: true, threads: []}
  },
  async created(){
    console.log("api: ", api);
    try {
      const res = await Taro.request({
        url: api.getHotNodes()
      })
      console.log("Response: ", res)
      this.loading = false
      this.threads = res.data
    } catch (error) {
      console.log("Error: ", error)
      this.loading = false
      await Taro.showToast({title: '载入Hot远程数据错误'})
    }
  }
}
</script>

<style scoped>

</style>
