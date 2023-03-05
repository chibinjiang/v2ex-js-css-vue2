import Vue from 'vue'
// import VirtualList from '@tarojs/components/virtual-list'
import Vuex from 'vuex'
import './app.css'

// Vue.use(VirtualList)


const store = new Vuex.Store({
  state: {thread: {}},
  mutations: {
    setThread: (state, thread) => {
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
