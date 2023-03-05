<template>
  <view class="node-container">
    <view v-for="item in allNodes" :key="item.title" class="container">
      <view class="title">
        <text style="margin-left: 5px">{{item.title}}</text>
      </view>
      <view class="nodes">
        <navigator v-for="node in item.nodes" :key="node.full_name" class="tag" :url="node | url">
          <text>{{node.full_name}}</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import Vue from 'vue'
import allNodes from './all_node'
import api from '../../utils/api'
import './index.css'

function getURL(node) {
  return `/pages/node_detail/node_detail${api.queryString(node)}`
}

export default {
  name: "nodes",
  data(){
    return {allNodes, }
  },
  filters: {
    url(node) {
      return getURL(node)
    }
  }
}
</script>

<style scoped>

</style>
