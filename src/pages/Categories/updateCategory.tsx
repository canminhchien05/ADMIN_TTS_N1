import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Card, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios.util";

const { Option } = Select;

const UpdateCategory = () => {
  const [form] = Form.useForm();
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { id } = useParams(); // lấy id từ URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, categoryRes] = await Promise.all([
          axiosInstance.get("/categories"),
          axiosInstance.get(`/categories/${id}`),
        ]);

        const allCategories = categoriesRes.data.filter((cat) => !cat.isDeleted);
        setParentCategories(allCategories);

        const category = categoryRes.data;
        form.setFieldsValue({
          name: category.name,
          description: category.description,
          parentId: category.parentId || undefined,
        });
      } catch {
        message.error("Lỗi khi tải dữ liệu danh mục");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/categories/${id}`, values);
      message.success("Cập nhật danh mục thành công");
      navigate("/admin/categories");
    } catch {
      message.error("Lỗi khi cập nhật danh mục");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <Card title="Cập nhật danh mục" style={{ maxWidth: 600, margin: "auto" }}>
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
            {parentCategories
              .filter((cat) => cat._id !== id) // tránh tự chọn chính mình làm cha
              .map((cat) => (
                <Option key={cat._id} value={cat._id}>
                  {cat.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cập nhật danh mục
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UpdateCategory;
