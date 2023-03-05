<template>
  <view class="detail">
    <thread
      :node="topic.node"
      :title="topic.title"
      :last_modified="topic.last_modified"
      :replies="topic.replies"
      :tid="topic.id"
      :member="topic.member"
      :not_navi="true"
    />
    <loading v-if="loading"/>
    <view v-else>
      <view class="main-content">
        <rich-text :nodes="content | html"></rich-text>
<!--        <view v-html="content | html" />-->
      </view>
      <view class="replies">
        <view v-for="(reply, ind) in replies" class="reply" :key="reply.id">
          <image :src="reply.member.avatar_large" class="avatar"/>
          <view class="main">
            <view class="author"> {{ reply.member.username }} </view>
            <view class="time"> {{ reply.last_modified | time }} </view>
<!--            <view>-->
<!--              <view class="author"> {{ reply.member.username }} </view>-->
<!--              <view class="time"> {{ reply.last_modified | time }} </view>-->
<!--            </view>-->
            <rich-text :nodes="reply.content_rendered | html" class="content"></rich-text>
<!--            <view v-html="reply.content_rendered | html" class='content' />-->
            <view class="floor">{{ ind + 1 }} 楼</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Vue from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/api'
import {timeagoInst, GlobalState, prettyHTML} from "../../utils";
import Thread from '../../components/thread'
import Loading from '../../components/loading'
import './index.css'

export default {
  name: "thread_detail",
  components: {loading: Loading, thread: Thread},
  data(){
    return {
      topic: GlobalState.thread,
      loading: true, replies: [], content: ''
    }
  },
  async created(){
    try {
      const id = GlobalState.thread.tid
      // const id = GlobalState.thread.tid || this.topic.tid
      console.log("GlobalState.thread.tid: ", GlobalState.thread.tid)
      const [{data}, {data: [{content_rendered}]}] = await Promise.all([
        Taro.request({url: api.getReplies(id)}),
        Taro.request({url: api.getTopics(id)})
      ])
      this.loading = false;
      this.replies = data
      this.content = content_rendered
    } catch (error) {
      this.loading = false;
      await Taro.showToast({title: '载入远程数据错误'})
    }
  },
  filters: {
    time(val){
      return timeagoInst.format(val * 1000)
    },
    html(val){
      return prettyHTML(val)
    }
  },
  // computed: {
  //   topic() {
  //     // 获取当前帖子的数据
  //     return this.$store.state.thread
  //   }
  // }
}
</script>

<style scoped>

</style>
