import React, { useState } from 'react'

interface BlogPost {
  id: number
  title: string
  content: string
}

const BlogsPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    { id: 1, title: 'Bài viết đầu tiên', content: 'Nội dung bài viết 1' },
    { id: 2, title: 'Bài viết thứ hai', content: 'Nội dung bài viết 2' },
  ])

  const [newPost, setNewPost] = useState({ title: '', content: '' })

  const handleAdd = () => {
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1
    setPosts([...posts, { id: newId, ...newPost }])
    setNewPost({ title: '', content: '' })
  }

  const handleDelete = (id: number) => {
    setPosts(posts.filter(p => p.id !== id))
  }

  const handleEdit = (id: number, field: keyof BlogPost, value: string) => {
    setPosts(posts.map(p => (p.id === id ? { ...p, [field]: value } : p)))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">Blog</h2>
      <div className="border rounded-xl p-4 shadow bg-white">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tiêu đề"
            className="border p-2 mr-2 mb-2 bg-white text-black"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            placeholder="Nội dung"
            className="border p-2 w-full mb-2 bg-white text-black"
            rows={3}
            value={newPost.content}
            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-black">ID</th>
              <th className="border p-2 text-black">Tiêu đề</th>
              <th className="border p-2 text-black">Nội dung</th>
              <th className="border p-2 text-black">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td className="border p-2 text-center text-black">{post.id}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    readOnly
                    value={post.title}
                    className="w-full border px-2 bg-white text-black"
                    onChange={e => handleEdit(post.id, 'title', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <textarea
                    className="w-full border px-2 bg-white text-black"
                    readOnly
                    rows={2}
                    value={post.content}
                    onChange={e => handleEdit(post.id, 'content', e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleDelete(post.id)} className="text-white bg-red-500">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlogsPage
