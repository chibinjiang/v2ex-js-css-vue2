<template>
  <thread
    :id="id"
    :key="thread.id"
    :node="thread.node"
    :title="thread.title"
    :last_modified="thread.last_modified"
    :replies="thread.replies"
    :tid="thread.id"
    :member="thread.member"
  />
</template>

<script>
import Thread from './thread'

export default {
  name: "row",  // 没用上
  components: {thread: Thread},
  props: ['id', 'index', 'data'],
  computed: {
    thread() {
      return this.data[this.index]
    }
  }
}
</script>

<style scoped>

</style>
