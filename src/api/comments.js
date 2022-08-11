import request from '@/util/request'

/**
 * 获取文章评论type:a 对评论的评论type:c
 * @param {Object} params 有文章的id 数据偏移量offset 评论限制个数limit
 * @returns Promise
 */
export const getComments = (params) => {
  return request({
    url: '/v1_0/comments',
    params
  })
}

/**
 * 发表评论
 * @param {Object} data 有target为目标的id content评论内容 art_id 文章id对文章评论时不需要传对评论内容回复时需要传
 * @returns Promise
 */

export const sendArticleComment = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
