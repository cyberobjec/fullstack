import axios from 'axios'

const API_URL = 'http://localhost:3000/posts'

// 创建新帖子
export const createPost = (data) => {
  return axios.post(API_URL, data)
}

// 获取所有帖子
export const getAllPosts = () => {
  return axios.get(API_URL)
}

// 获取单个帖子
export const getPost = (id) => {
  return axios.get(`${API_URL}/${id}`)
}

// 更新帖子
export const updatePost = (id, data) => {
  return axios.patch(`${API_URL}/${id}`, data)
}

// 删除帖子
export const deletePost = (id) => {
  return axios.delete(`${API_URL}/${id}`)
}
