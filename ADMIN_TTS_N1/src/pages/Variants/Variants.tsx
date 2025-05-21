import React, { useState } from 'react'

interface Variant {
  id: number
  name: string
  option: string
}

const VariantsPage = () => {
  const [variants, setVariants] = useState<Variant[]>([
    { id: 1, name: 'Màu sắc', option: 'Đỏ' },
    { id: 2, name: 'Kích thước', option: 'L' },
  ])

  const [newVariant, setNewVariant] = useState({ name: '', option: '' })

  const handleAdd = () => {
    const newId = variants.length > 0 ? Math.max(...variants.map(v => v.id)) + 1 : 1
    setVariants([...variants, { id: newId, ...newVariant }])
    setNewVariant({ name: '', option: '' })
  }

  const handleDelete = (id: number) => {
    setVariants(variants.filter(v => v.id !== id))
  }

  const handleEdit = (id: number, field: keyof Variant, value: string) => {
    setVariants(variants.map(v => (v.id === id ? { ...v, [field]: value } : v)))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Biến thể sản phẩm</h2>
      <div className="border rounded-xl p-4 shadow bg-white">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên biến thể"
            className="border p-2 mr-2 text-black bg-white"
            value={newVariant.name}
            onChange={e => setNewVariant({ ...newVariant, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tùy chọn"
            className="border p-2 mr-2 text-black bg-white"
            value={newVariant.option}
            onChange={e => setNewVariant({ ...newVariant, option: e.target.value })}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-black bg-white">ID</th>
              <th className="border p-2 text-black bg-white">Tên</th>
              <th className="border p-2 text-black bg-white">Tùy chọn</th>
              <th className="border p-2 text-black bg-white">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {variants.map(variant => (
              <tr key={variant.id}>
                <td className="border p-2 text-center">{variant.id}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    readOnly
                    value={variant.name}
                    className="w-full border px-2 text-black bg-white"
                    onChange={e => handleEdit(variant.id, 'name', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                  readOnly
                    type="text"
                    value={variant.option}
                    className="w-full border px-2 text-black bg-white"
                    onChange={e => handleEdit(variant.id, 'option', e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleDelete(variant.id)} className="text-white bg-red-500">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VariantsPage
