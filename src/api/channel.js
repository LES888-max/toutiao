import request from '@/util/request'
import storage from '@/util/storage'

/**
 * 获取我的频道
 * @returns promise
 */
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 *  获取所有频道
 * @returns promise
 */
export const getAllChannels = () =>
  request({
    url: '/v1_0/channels'
  })

/**
 * 删除频道
 * @param {*} target id值
 * @returns promise
 */
export const delChannel = (target) =>
  request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })

/**
 * 添加频道
 * @param {*} id 频道id
 * @param {*} seq 添加频道的索引值
 * @returns promise
 */

export const addChannel = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })

const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'

export const setMyChannelsToLocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannels)
}

export const getMyChannelsByLocal = (myChannels) => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
