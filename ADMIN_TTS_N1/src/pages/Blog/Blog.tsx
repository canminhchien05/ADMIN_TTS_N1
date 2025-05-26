import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { IBlog } from '../../types/blog.types';

const BlogsPage = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<IBlog[]>([
    {
      _id: '1',
      title: 'Bài viết đầu tiên',
      slug: 'bai-viet-dau-tien',
      coverImage: 'https://via.placeholder.com/150',
      content: 'Đây là nội dung bài viết đầu tiên',
      tags: ['react', 'typescript'],
      authorId: 'user1',
      published: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: '2',
      title: 'Bài viết thứ hai',
      slug: 'bai-viet-thu-hai',
      coverImage: 'https://via.placeholder.com/150',
      content: 'Đây là nội dung bài viết thứ hai',
      tags: ['blog', 'frontend'],
      authorId: 'user2',
      published: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  const goToAddPage = () => {
    navigate('/admin/addblog');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">Danh sách bài viết</h2>

      <button
        onClick={goToAddPage}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        + Thêm bài viết
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-black text-left">Ảnh bìa</th>
              <th className="border p-2 text-black text-left">Tiêu đề</th>
              <th className="border p-2 text-black text-left">Slug</th>
              <th className="border p-2 text-black text-center">Trạng thái</th>
              <th className="border p-2 text-black text-center">Ngày tạo</th>
              <th className="border p-2 text-black text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="border p-2">
                  <img src={blog.coverImage} alt="cover" className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="border p-2 text-black">{blog.title}</td>
                <td className="border p-2 text-black">{blog.slug}</td>
                <td className="border p-2 text-center">
                  <span className={`px-2 py-1 rounded text-white ${blog.published ? 'bg-green-500' : 'bg-gray-400'}`}>
                    {blog.published ? 'Công khai' : 'Ẩn'}
                  </span>
                </td>
                <td className="border p-2 text-center text-black">
                  {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Xoá
                  </button>
                  
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    <Link className='text-white' to={`admin/blogs/update/${blog._id}`}>Sửa</Link>
                  </button>
                  
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  Không có bài viết nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsPage;
