import React from "react";
import { Form, Input, Button, message, Card } from "antd";
import axios from "axios";

const CreateBrand = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: { name: string; logoUrl?: string; description?: string }) => {
    try {
      await axios.post("http://localhost:3000/api/brands", values);
      message.success("Tạo thương hiệu thành công");
      form.resetFields();
    } catch {
      message.error("Tạo thất bại");
    }
  };

  return (
    <Card title="Tạo thương hiệu mới" bordered={false} style={{ maxWidth: 600, margin: "0 auto" }}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ name: "", logoUrl: "", description: "" }}
      >
        <Form.Item
          label="Tên thương hiệu"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên thương hiệu" }]}
        >
          <Input placeholder="Nhập tên thương hiệu" />
        </Form.Item>

        <Form.Item label="Link logo" name="logoUrl">
          <Input placeholder="Nhập URL logo" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Mô tả thương hiệu" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo thương hiệu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateBrand;
