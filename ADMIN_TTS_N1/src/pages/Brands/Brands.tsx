import React, { useState } from 'react'

interface Brand {
  id: number
  name: string
  country: string
}

const BrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([
    { id: 1, name: 'Apple', country: 'USA' },
    { id: 2, name: 'Samsung', country: 'South Korea' },
  ])

  const [newBrand, setNewBrand] = useState({ name: '', country: '' })

  const handleAdd = () => {
    const newId = brands.length > 0 ? Math.max(...brands.map(b => b.id)) + 1 : 1
    setBrands([...brands, { id: newId, ...newBrand }])
    setNewBrand({ name: '', country: '' })
  }

  const handleDelete = (id: number) => {
    setBrands(brands.filter(b => b.id !== id))
  }

  const handleEdit = (id: number, field: keyof Brand, value: string) => {
    setBrands(brands.map(b => (b.id === id ? { ...b, [field]: value } : b)))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Thương hiệu</h2>
      <div className="border rounded-xl p-4 shadow bg-white">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên thương hiệu"
            className="border p-2 mr-2 bg-white text-black"
            value={newBrand.name}
            onChange={e => setNewBrand({ ...newBrand, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Quốc gia"
            className="border p-2 mr-2 bg-white text-black"
            value={newBrand.country}
            onChange={e => setNewBrand({ ...newBrand, country: e.target.value })}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Tên</th>
              <th className="border p-2">Quốc gia</th>
              <th className="border p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {brands.map(brand => (
              <tr key={brand.id}>
                <td className="border p-2 text-center">{brand.id}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    readOnly
                    value={brand.name}
                    className="w-full border px-2 bg-white text-black"
                    onChange={e => handleEdit(brand.id, 'name', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    readOnly
                    value={brand.country}
                    className="w-full border px-2 bg-white text-black"
                    onChange={e => handleEdit(brand.id, 'country', e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleDelete(brand.id)} className="text-white bg-red-500">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BrandsPage
