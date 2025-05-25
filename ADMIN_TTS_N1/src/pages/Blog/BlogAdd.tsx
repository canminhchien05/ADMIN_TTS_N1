/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Switch,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const AddBlogPage = () => {
  const [form] = Form.useForm();
  const [coverImage, setCoverImage] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: any) => {
    if (coverImage.length === 0) {
      message.error('Vui lòng tải lên ảnh bìa bài viết');
      return;
    }

    const blogData = {
      ...values,
      coverImage: coverImage[0].url || coverImage[0].response?.url || '',
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post('http://localhost:3000/api/posts', blogData);
      message.success('Tạo bài viết thành công');
      form.resetFields();
      setCoverImage([]);
    } catch (err) {
      console.error('Lỗi tạo bài viết:', err);
      message.error('Tạo bài viết thất bại');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 800, margin: 'auto' }}
    >
      <Form.Item
        name="title"
        label="Tiêu đề"
        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="slug"
        label="Đường dẫn (slug)"
        rules={[
          { required: true, message: 'Vui lòng nhập slug' },
          { pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Slug không hợp lệ' },
        ]}
      >
        <Input placeholder="ví dụ: cach-chon-ao-thun" />
      </Form.Item>

      <Form.Item label="Ảnh bìa">
        <Upload
          action="http://localhost:3000/api/upload"
          listType="picture-card"
          fileList={coverImage}
          onChange={({ fileList }) => setCoverImage(fileList.slice(-1))}
          maxCount={1}
        >
          {coverImage.length >= 1 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        name="content"
        label="Nội dung bài viết"
        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
      >
        <TextArea rows={6} placeholder="Vui lòng nhập nội dung" />
      </Form.Item>

      <Form.Item
        name="tags"
        label="Từ khoá (tags)"
      >
        <Select mode="tags" placeholder="Nhập từ khoá và nhấn Enter">
        </Select>
      </Form.Item>

      <Form.Item
        name="authorId"
        label="Tác giả"
        rules={[{ required: true, message: 'Vui lòng chọn người viết bài' }]}
      >
        <Select placeholder="Chọn nhà thiết kế">
          <Option value="NVB1">Người viết bài 1</Option>
          <Option value="NVB2">Người viết bài 2</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="published"
        label="Công khai"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo bài viết
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddBlogPage;
