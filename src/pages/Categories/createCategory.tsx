// File: components/CreateCategory.tsx
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import axios from "axios";
import type { Category } from "../../types/Category/category.type";

const { Option } = Select;

const CreateCategory = () => {
  const [form] = Form.useForm();
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchParents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      const active = res.data.filter((cat: Category) => !cat.isDeleted);
      setParentCategories(active);
    } catch {
      message.error("Không thể tải danh mục cha");
    }
  };

  useEffect(() => {
    fetchParents();
  }, []);

  const handleSubmit = async (values: Category) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/category", values);
      message.success("Tạo danh mục thành công");
      form.resetFields();
    } catch {
      message.error("Tạo danh mục thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2>Thêm danh mục</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="parentId" label="Danh mục cha">
          <Select allowClear placeholder="-- Không có danh mục cha --">
            {parentCategories.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo danh mục
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;
