import { Button, Card, message, Space, Spin, Table, Tag, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axios.util";

const ProductVariantList = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchVariants = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/variants?includeDeleted=true");
      setVariants(res.data);
    } catch (error) {
      console.error(error);
      message.error("Lỗi khi tải danh sách biến thể sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  const handleSoftDelete = async (id) => {
    try {
      await axiosInstance.patch(`/variants/${id}/soft-delete`);
      message.success("Đã chuyển vào thùng rác");
      fetchVariants();
    } catch {
      message.error("Lỗi khi xóa mềm biến thể");
    }
  };

  const handleRestore = async (id) => {
    try {
      await axiosInstance.patch(`/variants/${id}/restore`);
      message.success("Đã khôi phục biến thể");
      fetchVariants();
    } catch {
      message.error("Lỗi khi khôi phục biến thể");
    }
  };

  const handlePermanentDelete = async (id) => {
    try {
      await axiosInstance.delete(`/variants/${id}`);
      message.success("Đã xóa vĩnh viễn");
      fetchVariants();
    } catch {
      message.error("Lỗi khi xóa vĩnh viễn biến thể");
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: ["productId", "name"],
      key: "productName",
      render: (text) => text || "Không có",
    },
    {
      title: "Tên biến thể",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (value) =>
        value?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) || "-",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Màu sắc",
      key: "color",
      render: (_, record) => (
        <Space>
          {record.colorHexCode && (
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: record.colorHexCode,
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
          )}
          <span>{record.colorName || "-"}</span>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (value) =>
        value ? <Tag color="red">Đã xóa</Tag> : <Tag color="green">Hoạt động</Tag>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          {!record.isDeleted ? (
            <>
              <Link to={`/admin/variants/edit/${record._id}`}>
                <Button type="primary" size="small">
                  Sửa
                </Button>
              </Link>
              <Popconfirm
                title="Bạn có chắc muốn chuyển vào thùng rác?"
                onConfirm={() => handleSoftDelete(record._id)}
              >
                <Button danger size="small">Xóa</Button>
              </Popconfirm>
            </>
          ) : (
            <>
              <Button type="dashed" size="small" onClick={() => handleRestore(record._id)}>
                Khôi phục
              </Button>
              <Popconfirm
                title="Xóa vĩnh viễn? Không thể khôi phục!"
                onConfirm={() => handlePermanentDelete(record._id)}
              >
                <Button danger size="small">Xóa vĩnh viễn</Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin tip="Đang tải danh sách biến thể..." />
      </div>
    );
  }

  return (
    <Card
      title="Danh sách biến thể sản phẩm"
      extra={
        <Link to="/admin/variants/create">
          <Button type="primary">Thêm biến thể</Button>
        </Link>
      }
      style={{ maxWidth: 1200, margin: "auto" }}
    >
      <Table
        columns={columns}
        dataSource={variants}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};

export default ProductVariantList;
