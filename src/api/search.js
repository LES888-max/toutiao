import request from '@/util/request'

/**
 * 获取搜索建议
 * @param {String} q 搜索关键词
 * @returns Promise
 */

export const getSearchSuggestionsApi = (q) =>
  request({
    url: '/v1_0/suggestion',
    params: { q }
  })
