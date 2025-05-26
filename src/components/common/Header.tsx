import React, { useState, useEffect } from "react";
import { Search, Bell, User, LogOut } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios.util";

const Header = () => {
  const isLoggedIn = true;
  const userName = "Admin";
  const avatarUrl = "https://i.pravatar.cc/300";

  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const navigate = useNavigate();

  // Lấy danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi lấy danh mục:", err);
      }
    };
    fetchCategories();
  }, []);
   const handleSearch = () => {
    navigate(`/admin/search?name=${encodeURIComponent(searchText)}&categoryId=${categoryId === "all" ? "" : categoryId}`);
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="bg-white w-full shadow-md flex items-center justify-between px-6 py-3 sticky top-0 z-50">
      {/* Logo */}
      <div className="text-xl font-bold text-indigo-600 tracking-wide">CF_N1</div>

      {/* Search */}
      <div className="flex items-center gap-2 w-[450px] max-w-full">
        {/* Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm sản phẩm theo tên..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-gray-300 rounded-l-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Dropdown danh mục */}
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border border-gray-300 py-2 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">Tất cả danh mục</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Nút tìm */}
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Tìm
        </button>
      </div>

      {/* Thông tin người dùng */}
      <div className="flex items-center gap-4">
        {/* Thông báo */}
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600 hover:text-indigo-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </button>

        {isLoggedIn ? (
          <>
            <span className="text-sm text-gray-700 hidden sm:block">
              Xin chào, <strong>{userName}</strong>
            </span>
            <div className="relative group">
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500 cursor-pointer"
              />
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-md py-2 hidden group-hover:block z-50">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Tài khoản
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500">
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
