import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const query = useQuery();
  const name = query.get("name") || "";
  const categoryId = query.get("categoryId") || null;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/products", {
          params: {
            name,
            categoryId,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name, categoryId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Kết quả tìm kiếm cho "{name}" trong danh mục "{categoryId || "Tất cả"}"
      </h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : products.length > 0 ? (
        <ul>
          {products.map((prod) => (
            <li key={prod._id} className="mb-2 border-b pb-2">
              <h3 className="font-semibold">{prod.name}</h3>
              <p>Giá: {prod.price} VND</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không tìm thấy sản phẩm nào.</p>
      )}
    </div>
  );
};

export default SearchPage;
