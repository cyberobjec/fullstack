import React, { useEffect, useState } from 'react'
import { createPost, getAllPosts, updatePost, deletePost } from './postApi'

const PostsTable = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState({ title: '', content: '' })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ title: '', content: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllPosts()
      .then((response) => setPosts(response.data))
      .catch(() => setError('获取数据失败'))
  }, [])

  const handleCreatePost = () => {
    createPost(newPost)
      .then((response) => {
        setPosts([...posts, response.data])
        setNewPost({ title: '', content: '' })
      })
      .catch(() => setError('创建失败'))
  }

  const startEdit = (post) => {
    setEditingId(post.id)
    setEditData({ title: post.title, content: post.content })
  }

  const handleUpdatePost = (id) => {
    updatePost(id, editData)
      .then((response) => {
        setPosts(posts.map((post) => (post.id === id ? response.data : post)))
        setEditingId(null)
      })
      .catch(() => setError('更新失败'))
  }

  const handleDeletePost = (id) => {
    deletePost(id)
      .then(() => setPosts(posts.filter((post) => post.id !== id)))
      .catch(() => setError('删除失败'))
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">文章管理</h1>

        {/* Create Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">新建文章</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="标题"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <textarea
              placeholder="内容"
              value={newPost.content}
              onChange={(e) =>
                setNewPost({ ...newPost, content: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              rows={4}
            />
            <button
              onClick={handleCreatePost}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              创建
            </button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
              暂无文章
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                {editingId === post.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                      <button
                        onClick={() => handleUpdatePost(post.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        取消
                      </button>
                    </div>
                    <textarea
                      value={editData.content}
                      onChange={(e) =>
                        setEditData({ ...editData, content: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      rows={4}
                    />
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {post.title}
                      </h3>
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEdit(post)}
                          className="px-4 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="px-4 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default PostsTable
