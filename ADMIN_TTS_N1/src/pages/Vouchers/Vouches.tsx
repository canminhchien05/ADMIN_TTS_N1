import React, { useState } from 'react';

const VouchersPage = () => {
  const [vouchers, setVouchers] = useState([
    { id: 1, code: 'GIAM10', discount: 10 },
    { id: 2, code: 'SALE20', discount: 20 },
  ]);
  const [newVoucher, setNewVoucher] = useState({ code: '', discount: 0 });

  const handleAdd = () => {
    const newId = vouchers.length ? Math.max(...vouchers.map(v => v.id)) + 1 : 1;
    setVouchers([...vouchers, { id: newId, ...newVoucher }]);
    setNewVoucher({ code: '', discount: 0 });
  };

  const handleDelete = (id: number) => {
    setVouchers(vouchers.filter(v => v.id !== id));
  };

  const handleEdit = (id: number, field: string, value: string | number) => {
    setVouchers(vouchers.map(v => (v.id === id ? { ...v, [field]: value } : v)));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">Mã khuyến mãi</h2>
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <input
            type="text"
            placeholder="Mã giảm giá"
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
            value={newVoucher.code}
            onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value })}
          />
          <input
            type="number"
            placeholder="Phần trăm giảm"
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/4"
            value={newVoucher.discount}
            onChange={(e) =>
              setNewVoucher({ ...newVoucher, discount: Number(e.target.value) })
            }
          />
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Thêm
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Mã</th>
              <th className="px-4 py-2">Giảm (%)</th>
              <th className="px-4 py-2 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{voucher.id}</td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={voucher.code}
                    onChange={(e) =>
                      handleEdit(voucher.id, 'code', e.target.value)
                    }
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    className="border px-2 py-1 rounded w-full"
                    value={voucher.discount}
                    onChange={(e) =>
                      handleEdit(voucher.id, 'discount', Number(e.target.value))
                    }
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(voucher.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {vouchers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  Không có mã khuyến mãi nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VouchersPage;
