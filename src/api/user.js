import request from '@/utils/request'
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
export const getUser = () => {
  return request.get('/auth/currentUser')
}
