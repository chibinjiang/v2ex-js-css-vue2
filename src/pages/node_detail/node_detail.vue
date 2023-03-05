<template>
  <view>
    <loading v-if="loading" />
    <view v-else>
      <view class="info">
        <view>
          <image :src="nodeInfo.avatar_large" class="avatar"></image>
        </view>
        <view class="middle">
          <view class="bold"> {{ nodeInfo.title }}</view>
          <view class="numbers">
            <text class="mr10"> 主题: {{ nodeInfo.topics }} </text>
            <text>Stars: {{ nodeInfo.stars }}</text>
          </view>
        </view>
      </view>
      <text class="title"> {{ nodeInfo.header || '-' }} </text>
    </view>
    <thread-list :threads="threads" :loading="loading" style="margin-left: 20px"/>
  </view>
</template>

<script>
import Vue from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/api'
import Loading from '../../components/loading.vue'
import ThreadList from '../../components/thread_list'
import './index.css'

export default {
  name: "node_detail",
  components: {loading: Loading, 'thread-list': ThreadList},
  data () {
    return {
      nodeInfo: null,  loading: true, threads: []
    }
  },
  async created () {
    // 同时请求 threads 和 node detail
    try {
      const node_id = location.href.split("=")[1].split('&')[0];  // change to this.$route.query
      console.log("Created Node detail: ", node_id)
      // const res = await Taro.request({url: api.getNodeInfo(node_id)})
      const [node_res, threads_res] = await Promise.all([
        Taro.request({url: api.getNodeInfo(node_id)}),
        Taro.request({url: api.getNodeTopics(node_id)})
      ])
      this.nodeInfo = node_res.data
      this.threads = threads_res.data
      this.loading = false
    } catch (error) {
      this.loading = false
      await Taro.showToast({title: '载入Single Node远程数据错误'})
    }
  },
}
</script>

<style scoped>

</style>
