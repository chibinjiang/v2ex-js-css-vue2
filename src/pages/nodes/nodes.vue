<template>
  <view>
    <loading v-if="loading"></loading>
    <navigator v-else v-for="node in nodes" :key="node.id" class="container" :url="node | url">
      <view class="info">
        <view>
          <image :src="node.avatar_large" class="avatar"></image>
        </view>
        <view class="middle">
          <view class="bold"> {{ node.title }}</view>
          <view class="numbers">
            <text class="mr10"> 主题: {{ node.topics }} </text>
            <text>Stars: {{ node.stars }}</text>
          </view>
        </view>
      </view>
      <text class="title"> {{ node.header || '-' }} </text>
    </navigator>
  </view>
</template>

<script>
import Vue from 'vue'
import Taro from "@tarojs/taro";
import allNodes from './all_node'
import api from '../../utils/api'
import Loading from "../../components/loading";
import './index.css'

function getURL(node) {
  return `/pages/node_detail/node_detail${api.queryString(node)}`
}

export default {
  name: "nodes",
  components: {loading: Loading},
  data(){
    return {allNodes, nodes: [], loading: true}
  },
  async created(){
    try {
      const res = await Taro.request({
        url: api.getAllNode()
      })
      console.log("Response: ", res)
      this.loading = false
      this.nodes = res.data.slice(0, 10)  // data 是 第0层, 如果切换到nutui, 看看怎么翻页
    } catch (error) {
      console.log("Error: ", error)
      this.loading = false
      await Taro.showToast({title: '载入Nodes远程数据错误'})
    }
  },
  filters: {
    url(node) {
      return getURL({id: node.id})
    }
  }
}
</script>

<style scoped>

</style>
