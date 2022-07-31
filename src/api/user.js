import { request } from '@/util/request'

// /** enter键

/**
 *
 * @param {string} mobile
 * @param {string} code
 * @returns promise
 */

export const login = (mobile, code) =>
  request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })

/**
 * 获取验证码
 * @param {string} mobile
 * @returns promise
 */
export const getCodeAPI = (mobile) =>
  request({
    url: `/v1_0/sms/codes/${mobile}`
  })
