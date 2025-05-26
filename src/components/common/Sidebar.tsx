import {
  DashboardFilled,
  ShoppingFilled,
  AppstoreFilled,
  ControlFilled,
  TrademarkCircleFilled,
  ReadFilled,
  UsergroupAddOutlined,
  GiftFilled,
  BarChartOutlined,
} from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Tự động chọn mục theo URL
  const selectedKey = location.pathname.split('/')[2] || 'dashboard';

  const items: MenuProps['items'] = [
    {
      key: 'dashboard',
      label: 'Tổng quan',
      icon: <DashboardFilled />,
      children: [
        { key: 'dashboard', label: 'Tổng quan' },
      ],
    },
    {
      key: 'productmanage',
      label: 'Sản phẩm',
      icon: <ShoppingFilled />,
      children: [
        { key: 'products', label: 'Danh sách sản phẩm' },
        { key: 'productadd', label: 'Thêm sản phẩm' }
      ],
    },
    {
      key: 'categories',
      label: 'Danh mục',
      icon: <AppstoreFilled />,
      children: [
        { key: 'categories', label: 'Danh sách danh mục' },
        { key: 'categoryadd', label: 'Thêm danh mục' },
      ],
    },
    {
      key: 'variants',
      label: 'Biến thể',
      icon: <ControlFilled />,
      children: [
        { key: 'variants', label: 'Danh sách thuộc tính' },
        { key: 'variantadd', label: 'Thêm thuộc tính' },
      ],
    },
    {
      key: 'brands',
      label: 'Thương hiệu',
      icon: <TrademarkCircleFilled />,
      children: [
        { key: 'brands', label: 'Danh sách thương hiệu' },
        { key: 'brandadd', label: 'Thêm thương hiệu' },
      ],
    },
    {
      key: 'blogs',
      label: 'Bài viết',
      icon: <ReadFilled />,
      children: [
        { key: 'blogs', label: 'Danh sách blog' },
        { key: 'blogadd', label: 'Thêm blog' },
      ],
    },
    {
      key: 'users',
      label: 'Người dùng',
      icon: <UsergroupAddOutlined />,
      children: [
        { key: 'users', label: 'Danh sách người dùng' },
        { key: 'useradd', label: 'Thêm người dùng' },
      ],
    },
    {
      key: 'vouchers',
      label: 'Khuyến mãi',
      icon: <GiftFilled />,
      children: [
        { key: 'vouchers', label: 'Danh sách khuyến mãi' },
        { key: 'voucheradd', label: 'Thêm mã khuyến mãi' },
      ],
    },
    {
      key: 'report',
      label: 'Thống kê',
      icon: <BarChartOutlined />,
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'products': navigate('/admin/products'); break;
      case 'productadd': navigate('/admin/products/create'); break;
      case 'variants': navigate('/admin/variants'); break;
      case 'variantadd': navigate('/admin/variants/create'); break;
      case 'categories': navigate('/admin/categories'); break;
      case 'categoryadd': navigate('/admin/categories/create'); break;
      case 'brands': navigate('/admin/brands'); break;
      case 'brandadd': navigate('/admin/brands/create'); break;
      case 'blogs': navigate('/admin/blogs'); break;
      case 'blogadd': navigate('/admin/blog-add'); break;
      case 'vouchers': navigate('/admin/vouchers'); break;
      case 'voucheradd': navigate('/admin/voucher-add'); break;
      case 'users': navigate('/admin/users'); break;
      case 'useradd': navigate('/admin/user-add'); break;
      case 'report': navigate('/admin/report'); break;
      default: navigate('/admin'); break;
    }
  };

  return (
    <aside className="w-[280px] h-screen bg-white border-r shadow sticky top-0 z-40">
      <div className="text-xl font-bold text-center py-4 text-indigo-600 border-b">ADMIN</div>
      <Menu
        onClick={onClick}
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['productmanage']}
        items={items}
        className="sidebar-menu"
      />
    </aside>
  );
};

export default Sidebar;
