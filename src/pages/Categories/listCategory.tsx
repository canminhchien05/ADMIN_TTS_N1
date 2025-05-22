// pages/ListCategory.tsx
import React, { useEffect, useState } from "react";
import { Table, message, Tag } from "antd";
import axios from "axios";
import { axiosInstance } from "../../utils/axios.util";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("api/categories");
      setCategories(res.data);
    } catch {
      message.error("Lỗi khi tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Danh mục cha",
      dataIndex: "parentId",
      key: "parentId",
      render: (parent: { name?: string; _id?: string } | null) =>
        parent ? <Tag color="blue">{parent.name || "ID: " + parent._id}</Tag> : "—",
    },
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (deleted: boolean) =>
        deleted ? <Tag color="red">Đã xóa</Tag> : <Tag color="green">Hoạt động</Tag>,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 16 }}>Danh sách danh mục</h1>
      <Table
        rowKey="_id"
        loading={loading}
        dataSource={categories}
        columns={columns}
        bordered
      />
    </div>
  );
};

export default ListCategory;
