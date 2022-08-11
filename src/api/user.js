import request from '@/util/request'

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

export const getUserInfo = () =>
  request({
    url: '/v1_0/user/profile'
  })

// 如果传的是对象, axios默认将对象转成json并且加上content-type=application/json
// 如果传的是formDate表单, 那么axios会将表单提交给后端, 并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(form-data)
// const fm = new FormData()
// fm.append(表单的name,表单项)

/**
 * 上传头像
 * @param {*} file 图片的file对象
 * @return Promise
 */
export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

export const updateNickName = (name) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name
    }
  })
}

export const updateGender = (gender) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      gender
    }
  })
}

export const updateBirthday = (birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      birthday
    }
  })
}

export const getUserMessage = () => {
  return request({
    url: '/v1_0/user'
  })
}

export const followUser = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

export const unFollowUser = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
