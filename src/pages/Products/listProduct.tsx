import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Image,
  message,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IProduct } from '../../types/product/product.type';
import { axiosInstance } from '../../utils/axios.util';

const statusColorMap: Record<string, string> = {
  active: '#52c41a',
  hidden: '#faad14',
  sold_out: '#f5222d',
};

const statusLabelMap: Record<string, string> = {
  active: 'Hoạt động',
  hidden: 'Ẩn',
  sold_out: 'Hết hàng',
};

const formatPrice = (price?: number) =>
  price != null ? `${price.toLocaleString()} đ` : '-';

const ProductList = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/products?includeDeleted=true');
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

  // Xóa mềm: cập nhật isDeleted cho sản phẩm trong state
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      message.success('Xóa sản phẩm thành công');
      // Cập nhật ngay isDeleted trong products
      setProducts((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isDeleted: true, deletedAt: res.data.deletedAt || new Date().toISOString(),status: 'hidden' }
            : item
        )
      );
    } catch {
      message.error('Xóa sản phẩm thất bại');
    } finally {
      setLoading(false);
    }
  };
  const handleRestore = async (id: string) => {
  setLoading(true);
  try {
    await axiosInstance.patch(`/products/restore/${id}`);
    message.success('Khôi phục sản phẩm thành công');
    setProducts((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, isDeleted: false, deletedAt: null,status:'active' } : item
      )
    );
  } catch {
    message.error('Khôi phục sản phẩm thất bại');
  } finally {
    setLoading(false);
  }
  };
  const handleForceDelete = async (id: string) => {
  setLoading(true);
  try {
    await axiosInstance.delete(`/products/permanent/${id}`);
    message.success('Xoá vĩnh viễn thành công');
    setProducts((prev) => prev.filter((item) => item._id !== id));
  } catch {
    message.error('Xoá vĩnh viễn thất bại');
  } finally {
    setLoading(false);
  }
  };


  const columns: ColumnsType<IProduct> = [
    {
      title: 'Ảnh',
      dataIndex: 'images',
      key: 'images',
      width: 80,
      render: (images) => (
        <Image
          src={images?.[0]}
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          fallback="https://via.placeholder.com/60"
          preview={false}
        />
      ),
    },
    {
      title: 'Thương hiệu',
      key: 'brand',
      render: (_, record) =>
        record.brandId && typeof record.brandId === 'object' && 'name' in record.brandId
          ? record.brandId.name
          : 'Không rõ',
    },
    {
      title: 'Danh mục',
      key: 'category',
      render: (_, record) =>
        record.categoryId && typeof record.categoryId === 'object' && 'name' in record.categoryId
          ? record.categoryId.name
          : 'Không rõ',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      ellipsis: { showTitle: false },
      render: (name) => (
        <Tooltip title={name}>
          {name}
        </Tooltip>
      ),
    },
    {
      title: 'Giá sản phẩm',
      children: [
        {
          title: 'Giá nhập',
          dataIndex: 'importPrice',
          key: 'importPrice',
          width: 120,
          render: (price) => formatPrice(price),
        },
        {
          title: 'Giá bán',
          dataIndex: 'price',
          key: 'price',
          width: 120,
          render: (price) => formatPrice(price),
        },
        {
          title: 'Giá sale',
          dataIndex: 'salePrice',
          key: 'salePrice',
          width: 130,
          render: (salePrice, record) => {
            const base = record.price || 0;
            const sale = salePrice || 0;
            const discountPercent =
              base && sale ? Math.round(((base - sale) / base) * 100) : 0;

            return (
              <div>
                {formatPrice(sale)}
                {discountPercent > 0 && (
                  <Tag color="red" style={{ marginTop: 4 }}>{`-${discountPercent}%`}</Tag>
                )}
              </div>
            );
          },
        },
      ],
    },
        {
      title: 'Giá ưu đãi(trong khung giờ)',
      dataIndex: 'flashSale_discountedPrice',
      key: 'flashSale_discountedPrice',
      width: 130,
      render: (price, record) => {
        const now = new Date();
        const start = new Date(record.flashSale_start);
        const end = new Date(record.flashSale_end);
        
        if (now < start) {
          // Chưa đến ngày flash sale
          return <Tag color="blue">Sắp diễn ra</Tag>;
        } else if (start <= now && now <= end) {
          // Đang diễn ra
          return (
            <div>
              {formatPrice(price)}
              <Tag color="gold" style={{ marginLeft: 4 }}>Đang diễn ra</Tag>
            </div>
          );
        } else {
          // Flash sale đã kết thúc hoặc không có flash sale
          return formatPrice(price) || '-';
        }
      },
    },

    {
      title: 'Tổng bán',
      dataIndex: 'totalPurchased',
      key: 'totalPurchased',
      width: 100,
      render: (val) => val || 0,
      sorter: (a, b) => (a.totalPurchased || 0) - (b.totalPurchased || 0),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (status) => (
        <Tooltip title={statusLabelMap[status || 'active'] || status}>
          <Tag color={statusColorMap[status || 'active']} style={{ textTransform: 'capitalize' }}>
            {status}
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: 'Đã xóa',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      width: 80,
      render: (deleted) =>
        deleted ? <Tag color="red">Có</Tag> : <Tag color="green">Không</Tag>,
    },
    {
      title: 'Ngày xóa',
      dataIndex: 'deletedAt',
      key: 'deletedAt',
      width: 160,
      render: (date) => (date ? new Date(date).toLocaleString() : ''),
    },
    {
  title: 'Hành động',
  key: 'actions',
  width: 110,
  fixed: 'right',
  render: (_, record) => (
  <Space>
    {!record.isDeleted ? (
      <>
        <Tooltip title="Sửa sản phẩm">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/products/edit/${record._id}`)}
          />
        </Tooltip>
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa sản phẩm này?"
          onConfirm={() => record._id && handleDelete(record._id)}
          okText="Có"
          cancelText="Không"
        >
          <Tooltip title="Xóa sản phẩm">
            <Button danger icon={<DeleteOutlined />} />
          </Tooltip>
        </Popconfirm>
      </>
    ) : (
      <>
        <Tooltip title="Khôi phục sản phẩm">
          <Button
            type="default"
            onClick={() => record._id && handleRestore(record._id)}
          >
            Khôi phục
          </Button>
        </Tooltip>
        <Popconfirm
          title="Xoá vĩnh viễn sản phẩm này? Không thể khôi phục!"
          onConfirm={() => record._id && handleForceDelete(record._id)}
          okText="Xoá"
          cancelText="Huỷ"
        >
          <Tooltip title="Xoá vĩnh viễn">
            <Button danger type="primary">
              Xoá vĩnh viễn
            </Button>
          </Tooltip>
        </Popconfirm>
      </>
    )}
  </Space>
)

}

  ];

  return (
    <Table
      columns={columns}
      dataSource={products}
      rowKey="_id"
      loading={loading}
      pagination={{ pageSize: 10, showSizeChanger: true }}
      scroll={{ x: 2000 }}
      bordered
      size="large"
      rowClassName={() => 'hover:bg-gray-50'}
      style={{ margin: 0, width: '100%' }}
    />
  );
};

export default ProductList;
