// import React from 'react';
import { Search, User } from 'lucide-react';  

const Header = () => {
  return (
    <header className="bg-white w-full shadow-md flex items-center justify-between px-6 py-3 sticky top-0 z-50">

      <div className="text-xl font-bold text-indigo-600 tracking-wide">CF_N1</div>

      <div className="relative w-[300px] max-w-full hidden md:block">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="w-full border border-gray-300 bg-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700 hidden sm:block">Xin chào, <strong>Admin</strong></span>
        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
