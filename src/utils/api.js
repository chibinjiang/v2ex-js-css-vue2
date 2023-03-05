const DOMAIN = 'https://www.v2ex.com/api/'

const Endpoint = {
  all_node: 'nodes/all.json',
  node_info: 'nodes/show.json',
  latest_topic: 'topics/latest.json',
  hot_topic: 'topics/hot.json',
  get_topics: 'topics/show.json',
  get_replies: 'replies/show.json',
  get_user_info: 'members/show.json',
}

function queryString (obj) {
  if (!obj) {
    return ''
  }
  return '?' + Object.keys(obj).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
  }).join('&')
}

function getAllNode () {
  // 获取全部节点
  return DOMAIN + Endpoint.all_node
}

function getNodeInfo (id) {
  // 获取 节点的信息
  return DOMAIN + Endpoint.node_info + queryString({id})
}

function getHotNodes () {
  return DOMAIN + Endpoint.hot_topic;
}

function getLatestTopic () {
  return DOMAIN + Endpoint.latest_topic;
}

function getReplies (topic_id) {
  return DOMAIN + Endpoint.get_replies + queryString({topic_id})
}

function getTopics (id) {
  return DOMAIN + Endpoint.get_topics + queryString({id})
}


function getNodeTopics (node_id) {
  return DOMAIN + Endpoint.get_topics + queryString({node_id})
}

export default {
  getAllNode,
  getNodeInfo,
  getLatestTopic,
  getReplies,
  getHotNodes,
  queryString,
  getTopics,
  getNodeTopics
}
