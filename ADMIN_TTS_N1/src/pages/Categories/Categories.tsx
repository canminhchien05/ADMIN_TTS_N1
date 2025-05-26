// src/pages/categories/CategoriesPage.tsx
import { useState } from 'react'

interface Category {
  id: number
  name: string
  description: string
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Danh mục A', description: 'Mô tả A' },
    { id: 2, name: 'Danh mục B', description: 'Mô tả B' },
  ])

  const [newCategory, setNewCategory] = useState({ name: '', description: '' })

  const handleAdd = () => {
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1
    setCategories([...categories, { id: newId, ...newCategory }])
    setNewCategory({ name: '', description: '' })
  }

  const handleDelete = (id: number) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  const handleEdit = (id: number, field: keyof Category, value: string) => {
    setCategories(categories.map(c => (c.id === id ? { ...c, [field]: value } : c)))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Danh mục sản phẩm</h2>
      <div className="border rounded-xl p-4 shadow bg-white">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên danh mục"
            className="border p-2 mr-2 text-black bg-white"
            value={newCategory.name}
            onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mô tả"
            className="border p-2 mr-2 text-black bg-white"
            value={newCategory.description}
            onChange={e => setNewCategory({ ...newCategory, description: e.target.value })}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-black bg-white">ID</th>
              <th className="border p-2 text-black bg-white">Tên</th>
              <th className="border p-2 text-black bg-white">Mô tả</th>
              <th className="border p-2 text-black bg-white">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td className="border p-2 text-center text-black bg-white">{category.id}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={category.name}
                    className="w-full border px-2 text-black bg-white"
                    onChange={e => handleEdit(category.id, 'name', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    readOnly
                    value={category.description}
                    className="w-full border px-2 text-black bg-white"
                    onChange={e => handleEdit(category.id, 'description', e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleDelete(category.id)} className="text-white bg-red-500">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CategoriesPage
