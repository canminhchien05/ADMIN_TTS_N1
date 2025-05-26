import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  message,
  Card,
  Row,
  Col,
  Space,
  Spin,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios.util";

const { Option } = Select;

const UpdateProductVariant = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, variantRes] = await Promise.all([
          axiosInstance.get("/products"),
          axiosInstance.get(`/variants/${id}`),
        ]);

        setProducts(productsRes.data.filter((p) => !p.isDeleted));
        const data = variantRes.data;

        form.setFieldsValue({
          ...data,
          productId: data.productId?._id || data.productId, // hỗ trợ populate
        });
      } catch {
        message.error("Lỗi khi tải dữ liệu biến thể");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axiosInstance.put(`/variants/${id}`, values);
      message.success("Cập nhật biến thể thành công");
      navigate("/admin/variants");
    } catch {
      message.error("Lỗi khi cập nhật biến thể");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <Spin tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  return (
    <Card title="Cập nhật biến thể sản phẩm" style={{ maxWidth: 1000, margin: "auto" }}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Sản phẩm (Của danh mục)"
              name="productId"
              rules={[{ required: true, message: "Vui lòng chọn sản phẩm" }]}
            >
              <Select placeholder="Chọn sản phẩm">
                {products.map((product) => (
                  <Option key={product._id} value={product._id}>
                    {product.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Tên biến thể"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên biến thể" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="SKU" name="sku">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Số lượng tồn kho" name="stockQuantity">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Giá bán" name="price">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Giá nhập" name="importPrice">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Giá khuyến mãi" name="salePrice">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Tên màu" name="colorName">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Mã màu (Hex)" name="colorHexCode">
              <Input
                placeholder="#000000"
                addonAfter={
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: form.getFieldValue("colorHexCode") || "#000",
                      border: "1px solid #ccc",
                    }}
                  />
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Ảnh màu (URL)" name="colorImageUrl">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Tên kích thước" name="sizeName">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Mô tả kích thước" name="sizeDescription">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: "right" }}>
          <Space>
            <Button onClick={() => navigate("/admin/variants")}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UpdateProductVariant;
