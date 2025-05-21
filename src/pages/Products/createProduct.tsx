import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Upload,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';
import axios from 'axios';
// import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<UploadFile[]>([]);

  const handleSubmit = async (values: any) => {
    if (images.length === 0) {
      message.error('Vui lòng tải lên ít nhất một ảnh sản phẩm');
      return;
    }

    const { flashSale, ...rest } = values;

    const productData = {
      ...rest,
      flashSale_start: flashSale?.[0]?.toISOString(),
      flashSale_end: flashSale?.[1]?.toISOString(),
      images: images.map((img) => img.url || img.response?.url || ''),
    };

    try {
      await axios.post('http://localhost:3000/api/products', productData);
      message.success('Tạo sản phẩm thành công');
      form.resetFields();
      setImages([]);
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      message.error('Tạo sản phẩm thất bại');
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
        name="name"
        label="Tên sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="descriptionShort"
        label="Mô tả ngắn"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="descriptionLong"
        label="Mô tả chi tiết"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="price"
        label="Giá gốc"
        rules={[
          { required: true, message: 'Vui lòng nhập giá gốc' },
          { type: 'number', min: 0 },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="importPrice"
        label="Giá nhập"
        rules={[
          { required: true, message: 'Vui lòng nhập giá nhập' },
          { type: 'number', min: 0 },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="salePrice"
        label="Giá bán"
        rules={[
          { required: true, message: 'Vui lòng nhập giá bán' },
          { type: 'number', min: 0 },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="brandId"
        label="Thương hiệu"
        rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
      >
        <Select placeholder="Chọn thương hiệu">
          <Option value="665000000000000000000001">Thương hiệu 1</Option>
          <Option value="665000000000000000000002">Thương hiệu 2</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="categoryId"
        label="Danh mục"
        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
      >
        <Select placeholder="Chọn danh mục">
          <Option value="666000000000000000000001">Danh mục 1</Option>
          <Option value="666000000000000000000002">Danh mục 2</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="flashSale_discountedPrice"
        label="Giá Flash Sale"
        rules={[{ type: 'number', min: 0 }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="flashSale"
        label="Thời gian Flash Sale"
        rules={[
          {
            validator: (_, value) => {
              if (!value) return Promise.resolve();
              if (value.length !== 2) {
                return Promise.reject('Chọn đầy đủ thời gian');
              }
              if (value[0].isAfter(value[1])) {
                return Promise.reject('Bắt đầu phải trước kết thúc');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <RangePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Hình ảnh sản phẩm (tối đa 5)">
        <Upload
          action="http://localhost:3000/api/upload"
          listType="picture-card"
          fileList={images}
          onChange={({ fileList }) => setImages(fileList)}
          maxCount={5}
        >
          {images.length >= 5 ? null : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item
        name="status"
        label="Trạng thái"
        initialValue="active"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
      >
        <Select>
          <Option value="active">Hiển thị</Option>
          <Option value="hidden">Ẩn</Option>
          <Option value="sold_out">Hết hàng</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProduct;
