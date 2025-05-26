import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-30">
        <Header />
      </header>

      {/* Body with Sidebar and Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar fixed width */}
        <aside className="w-[300px] bg-white shadow fixed top-16 bottom-0 left-0 z-20">
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-1 ml-[200px] overflow-auto p-2">
          <div className="bg-white rounded-xl p-2 shadow">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
