import { BarsOutlined, ContainerOutlined, DashboardFilled, FileTextFilled, HighlightFilled, ProductFilled } from '@ant-design/icons';
import { Menu, type MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  type MenuItem = Required<MenuProps>['items'][number];
  const navigate = useNavigate()
  const items: MenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardFilled />,
    },
    {
      key: 'productmanage',
      label: 'Quản lý sản phẩm',
      icon: <ProductFilled />,
      children: [
        { key: 'products', label: 'Danh sách sản phẩm' },
        { key: 'productadd', label: 'Thêm sản phẩm' }
      ],
    },
    {
      key: 'categories',
      label: 'Quản lý danh mục',
      icon: <BarsOutlined />,
      children: [
        { key: 'categories', label: 'Danh sách danh mục' },
        { key: 'categoryadd', label: 'Thêm danh mục' },
      ],
    },
    {
      key: 'variants',
      label: 'Quản lý biến thể',
      icon: <HighlightFilled />,
      children: [
        { key: 'variants', label: 'Danh sách biến thể' },
        { key: 'variantadd', label: 'Thêm thuộc tính' },
      ],
    },
    {
      key: 'brands',
      label: 'Quản lý thương hiệu',
      icon: <HighlightFilled />,
      children: [
        { key: 'brands', label: 'Danh sách thương hiệu' },
        { key: 'brandadd', label: 'Thêm thương thiệu' },
      ],
    },
    {
      key: 'blogs',
      label: 'Quản lý blog',
      icon: <ContainerOutlined />,
      children: [
        { key: 'blogs', label: 'Danh sách blogs' },
        { key: 'blogadd', label: 'Thêm blogs' },
      ],
    },
    {
      key: 'users',
      label: 'Quản lý người dùng',
      icon: <HighlightFilled />,
      children: [
        { key: 'users', label: 'Danh sách người dùng' },
        { key: 'usertadd', label: 'Thêm người dùng' },
      ],
    },
    {
      key: 'vouchers',
      label: 'Quản lý khuyến mãi',
      icon: <HighlightFilled />,
      children: [
        { key: 'vouchers', label: 'Danh sách khuyến mãi' },
        { key: 'voucheradd', label: 'Thêm mã khuyến mãi' },
      ],
    },
    {
      key: 'report',
      label: 'Thống kê',
      icon: <FileTextFilled />,
    },
  ];
  const onClick: MenuProps['onClick'] = ({key}) => {
      switch(key){
        case "products":
          navigate("/admin/products")
          break;
        case "productadd":
          navigate("/admin/product-add")
          break;
        case "variants":
          navigate("/admin/variants")
          break;
        case "variantadd":
          navigate("/admin/variant-add")
          break;
        case "categories":
          navigate("/admin/categories")
          break;
        case "categoryadd":
          navigate("/admin/category-add")
          break;
        case "brands":
          navigate("/admin/brands")
          break;
        case "brandadd":
          navigate("/admin/brand-add")
          break;
        case "blogs":
          navigate("/admin/blogs")
          break;
        case "blogadd":
          navigate("/admin/blogs/add")
          break;
        case "vouchers":
          navigate("/admin/vouchers")
          break;
        case "voucheradd":
          navigate("/admin/voucher-add")
          break;
        case "users":
          navigate("/admin/users")
          break;
        case "useradd":
          navigate("/admin/user-add")
          break;
        default:
           navigate("/admin")
           break;
      }
  };
  return (
    <div className='w-[300px] h-screen bg-white'>
      <Menu
      onClick={onClick}
      style={{ width: '100%' }}
      defaultSelectedKeys={['dashboard']}
      mode="inline"
      items={items}
    />
    </div>
  )
}

export default Sidebar