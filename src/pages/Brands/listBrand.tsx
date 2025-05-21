import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Popconfirm, message } from "antd";
import axios from "axios";
import { DeleteOutlined, ReloadOutlined } from "@ant-design/icons";

const ListBrand = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/brands");
      setBrands(response.data);
    } catch {
      message.error("Failed to load brands.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/brands/${id}`);
      message.success("Brand deleted");
      fetchBrands();
    } catch {
      message.error("Delete failed");
    }
  };

  const columns = [
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Logo",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (logo: string | undefined) =>
        logo ? (
          <img src={logo} alt="logo" style={{ width: 60, height: 40, objectFit: "contain" }} />
        ) : (
          <Tag color="default">Không có</Tag>
        ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted: boolean) =>
        isDeleted ? <Tag color="red">Đã xóa</Tag> : <Tag color="green">Hoạt động</Tag>,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Xác nhận xóa?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} disabled={record.isDeleted}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button icon={<ReloadOutlined />} onClick={fetchBrands} loading={loading}>
          Tải lại
        </Button>
      </Space>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={brands}
        loading={loading}
        bordered
      />
    </div>
  );
};

export default ListBrand;
