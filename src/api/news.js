import request from '@/util/request'

/**
 *  获取文章
 * @param {*} channelId 频道的id
 * @param {*} timestamp  请求第一页数据传当前时间戳，请求上一页传上一页时间戳
 * @returns promise
 */
export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
