import { Table, Image, Tag, Space, Button, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { IProduct } from '../../types/product/product.type';
import { useNavigate } from 'react-router-dom';

const statusColorMap: Record<string, string> = {
  active: 'green',
  hidden: 'orange',
  sold_out: 'red',
};



const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/api/products');
      setProducts(res.data);
    } catch {
      message.error('Lấy danh sách sản phẩm thất bại');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      message.success('Xóa sản phẩm thành công');
      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch {
      message.error('Xóa sản phẩm thất bại');
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <Image src={images?.[0]} width={60} height={60} style={{ objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả ngắn',
      dataIndex: 'descriptionShort',
      key: 'descriptionShort',
    },
    {
      title: 'Mô tả chi tiết',
      dataIndex: 'descriptionLong',
      key: 'descriptionLong',
    },
    {
      title: 'Giá gốc',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (price != null ? `${price.toLocaleString()} đ` : ''),
    },
    {
      title: 'Giá nhập',
      dataIndex: 'importPrice',
      key: 'importPrice',
      render: (price) => (price != null ? `${price.toLocaleString()} đ` : ''),
    },
    {
      title: 'Giá bán',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (price) => (price != null ? `${price.toLocaleString()} đ` : ''),
    },
    {
      title: 'Giá Flash Sale',
      dataIndex: 'flashSale_discountedPrice',
      key: 'flashSale_discountedPrice',
      render: (price) => (price != null ? `${price.toLocaleString()} đ` : ''),
    },
    {
      title: 'Flash Sale bắt đầu',
      dataIndex: 'flashSale_start',
      key: 'flashSale_start',
      render: (date) => (date ? new Date(date).toLocaleString() : ''),
    },
    {
      title: 'Flash Sale kết thúc',
      dataIndex: 'flashSale_end',
      key: 'flashSale_end',
      render: (date) => (date ? new Date(date).toLocaleString() : ''),
    },
    {
      title: 'Thương hiệu (ID)',
      dataIndex: 'brandId',
      key: 'brandId',
    },
    {
      title: 'Danh mục (ID)',
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Tổng bán',
      dataIndex: 'totalPurchased',
      key: 'totalPurchased',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={statusColorMap[status || 'active']}>{status}</Tag>,
    },
    {
      title: 'Đã xóa',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (deleted) => (deleted ? 'Có' : 'Không'),
    },
    {
      title: 'Ngày xóa',
      dataIndex: 'deletedAt',
      key: 'deletedAt',
      render: (date) => (date ? new Date(date).toLocaleString() : ''),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => navigate(`/admin/products/edit/${record._id}`)} />
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => record._id && handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      scroll={{ x: 1400 }}
    />
  );
};

export default ProductList;
