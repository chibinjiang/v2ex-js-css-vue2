import Vue from 'vue'
// import VirtualList from '@tarojs/components/virtual-list'
import { Button } from '@nutui/nutui-taro'
// 引入所有组件的样式文件
import Vuex from 'vuex'
import '@nutui/nutui-taro/dist/style.css'
import './app.css'

Vue.use(Button)


const store = new Vuex.Store({
  state: {thread: {}},
  mutations: {
    setThread: (state, thread) => {
      console.log("Set Thread: ", state, thread)
      state.thread = {...thread}
    }
  }
})


const App = {
  store,
  // onShow (options) {
  // },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
