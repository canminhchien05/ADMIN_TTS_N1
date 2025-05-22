import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import {
  DashboardOutlined,
  AppstoreOutlined,
  TagsOutlined,
  ShopOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

const { SubMenu } = Menu

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Đặt state để kiểm soát menu đang mở rộng
  const [openKeys, setOpenKeys] = useState<string[]>([])

  // Các key của submenu để kiểm tra
  const rootSubmenuKeys = ['/admin/products', '/admin/categories']

  useEffect(() => {
    // Mặc định mở submenu nếu url thuộc về sản phẩm hoặc category
    const path = location.pathname
    if (path.startsWith('/admin/products')) {
      setOpenKeys(['/admin/products'])
    } else if (path.startsWith('/admin/categories')) {
      setOpenKeys(['/admin/categories'])
    } else {
      setOpenKeys([])
    }
  }, [location.pathname])

  const onOpenChange = keys => {
    // Chỉ mở 1 submenu cùng lúc (nếu muốn)
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <aside
      style={{
        width: 200,
        height: 'calc(100vh - 64px)',
        position: 'fixed',
        top: 64,
        left: 0,
        bottom: 0,
        overflowY: 'auto',
        background: '#001529',
        zIndex: 100,
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item key="/admin" icon={<DashboardOutlined />}>
          Dashboard
        </Menu.Item>

        <SubMenu key="/admin/products" icon={<AppstoreOutlined />} title="Products">
          <Menu.Item key="/admin/products/">List</Menu.Item>
          <Menu.Item key="/admin/products/create">Create</Menu.Item>
        </SubMenu>

        <SubMenu key="/admin/categories" icon={<TagsOutlined />} title="Categories">
          <Menu.Item key="/admin/categories">List</Menu.Item>
          <Menu.Item key="/admin/categories/create">Create</Menu.Item>
        </SubMenu>

        <Menu.Item key="/admin/brands" icon={<ShopOutlined />}>
          Brands
        </Menu.Item>

        <SubMenu key="/admin/order" icon={<TagsOutlined />} title="Orders">
          <Menu.Item key="/admin/order">List</Menu.Item>
        </SubMenu>
      </Menu>
    </aside>
  )
}

export default Sidebar
