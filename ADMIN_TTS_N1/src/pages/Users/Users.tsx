import { useState } from 'react'

interface User {
  id: number
  name: string
  email: string
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com' },
    { id: 2, name: 'Trần Thị B', email: 'b@example.com' },
  ])

  const [newUser, setNewUser] = useState({ name: '', email: '' })

  const handleAdd = () => {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    setUsers([...users, { id: newId, ...newUser }])
    setNewUser({ name: '', email: '' })
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const handleEdit = (id: number, field: keyof User, value: string) => {
    setUsers(users.map(u => (u.id === id ? { ...u, [field]: value } : u)))
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Người dùng</h2>
      <div className="border rounded-xl p-4 shadow bg-white">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tên người dùng"
            className="border p-2 mr-2 text-black bg-white"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 mr-2 text-black bg-white"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Thêm</button>
        </div>

        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-black bg-white">ID</th>
              <th className="border p-2 text-black bg-white">Tên</th>
              <th className="border p-2 text-black bg-white">Email</th>
              <th className="border p-2 text-black bg-white">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border p-2 text-center">{user.id}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={user.name}
                    className="w-full border px-2 text-black bg-white"
                    onChange={e => handleEdit(user.id, 'name', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="email"
                    value={user.email}
                    className="w-full border px-2 text-black bg-white"
                    onChange={e => handleEdit(user.id, 'email', e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleDelete(user.id)} className="text-white bg-red-500 ">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersPage
