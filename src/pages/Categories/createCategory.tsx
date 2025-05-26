import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Card } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios.util";

const { Option } = Select;

const CreateCategory = () => {
  const [form] = Form.useForm();
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // chỉ dùng nếu bạn dùng react-router

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setParentCategories(res.data.filter((cat) => !cat.isDeleted));
      } catch {
        message.error("Lỗi khi tải danh mục cha");
      }
    };
    fetchCategories();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axiosInstance.post("/categories", values);
      message.success("Tạo danh mục thành công");
      navigate("/admin/categories"); // chuyển hướng về trang danh sách
    } catch {
      message.error("Lỗi khi tạo danh mục");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Tạo danh mục mới" style={{ maxWidth: 600, margin: "auto" }}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Danh mục cha" name="parentId">
          <Select allowClear placeholder="Không có (danh mục gốc)">
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
    </Card>
  );
};

export default CreateCategory;
