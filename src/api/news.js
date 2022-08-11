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

/**
 * 获取新闻详情
 * @param {String} id 文章id
 * @returns Promise
 */

export const getArticleDetailsAPI = (id) => {
  return request({
    url: `/v1_0/articles/${id}`
  })
}

export const collectionArticle = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

export const unCollectionArticle = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

export const likeArticle = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

export const unLikeArticle = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
