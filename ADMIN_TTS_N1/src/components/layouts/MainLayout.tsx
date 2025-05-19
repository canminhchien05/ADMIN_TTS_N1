import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow">
        <Header />
      </header>
      <div className="flex flex-1">
        <aside className="w-[300px] bg-white shadow">
          <Sidebar />
        </aside>

        <main className="flex-1 bg-[#f6f9ff] p-5 overflow-y-auto">
          <div className="bg-white p-5 rounded-md shadow">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="bg-white shadow">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
