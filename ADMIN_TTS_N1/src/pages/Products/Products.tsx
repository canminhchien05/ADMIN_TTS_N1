import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([ 
    { id: 1, name: 'Sản phẩm A', price: 100000 },
    { id: 2, name: 'Sản phẩm B', price: 200000 }
  ])
  const [newProduct, setNewProduct] = useState({ name: '', price: 0 })

  const handleAdd = () => {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    setProducts([...products, { id: newId, ...newProduct }])
    setNewProduct({ name: '', price: 0 })
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const handleEdit = (id: number, field: keyof Product, value: string | number) => {
    setProducts(products.map(p => (p.id === id ? { ...p, [field]: value } : p)))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Sản phẩm</h2>
      <div className="border rounded-xl p-4 shadow bg-white">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên sản phẩm"
            className="border p-2 mr-2 text-black bg-white"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Giá"
            className="border p-2 mr-2 text-black bg-white"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-black bg-white">ID</th>
              <th className="border p-2 text-black bg-white">Tên</th>
              <th className="border p-2 text-black bg-white">Giá</th>
              <th className="border p-2 text-black bg-white">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="border p-2 text-center">{product.id}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    readOnly
                    value={product.name}
                    className="w-full border px-2 text-black bg-white"
                    onChange={e => handleEdit(product.id, 'name', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    readOnly
                    value={product.price}
                    className="w-full border px-2 text-black bg-white"
                    onChange={e => handleEdit(product.id, 'price', Number(e.target.value))}
                  />
                </td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleDelete(product.id)} className="text-white bg-red-500">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductsPage
