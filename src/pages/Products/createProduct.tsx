import {
  Button,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Upload,
  message,
  Row,
  Col,
  Spin,
  Divider,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axios.util';

const { RangePicker } = DatePicker;
const { Option } = Select;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<UploadFile[]>([]);
  const [brands, setBrands] = useState<{ _id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, []);

  const fetchBrands = async () => {
    setLoadingBrands(true);
    try {
      const res = await axiosInstance.get('/brands');
      setBrands(res.data);
    } catch {
      message.error('Không lấy được danh sách thương hiệu');
    } finally {
      setLoadingBrands(false);
    }
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await axiosInstance.get('/categories');
      setCategories(res.data);
    } catch {
      message.error('Không lấy được danh sách danh mục');
    } finally {
      setLoadingCategories(false);
    }
  };

  const handleSubmit = async (values: any) => {
    if (images.length === 0) {
      message.error('Vui lòng chọn ít nhất 1 ảnh sản phẩm');
      return;
    }

    const { flashSale, ...rest } = values;

    const productData = {
      ...rest,
      flashSale_start: flashSale?.[0]?.toISOString() || null,
      flashSale_end: flashSale?.[1]?.toISOString() || null,
      images: images.map((img) => img.url || img.response?.url).filter(Boolean),
    };

    try {
      await axiosInstance.post('/products', productData);
      message.success('Tạo sản phẩm thành công');
      form.resetFields();
      setImages([]);
      navigate('/admin/products');
    } catch (error) {
      message.error('Tạo sản phẩm thất bại');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{ maxWidth: 1000, margin: '0 auto', padding: 24, background: '#fff' }}
    >
      <Divider orientation="left">Thông tin cơ bản</Divider>
      <Row gutter={16}>
        <Col md={12}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            name="brandId"
            label="Thương hiệu"
            rules={[{ required: true, message: 'Chọn thương hiệu' }]}
          >
            {loadingBrands ? (
              <Spin />
            ) : (
              <Select placeholder="Chọn thương hiệu">
                {brands.map((b) => (
                  <Option key={b._id} value={b._id}>
                    {b.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Danh mục"
            rules={[{ required: true, message: 'Chọn danh mục' }]}
          >
            {loadingCategories ? (
              <Spin />
            ) : (
              <Select placeholder="Chọn danh mục">
                {categories.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col md={12}>
          <Form.Item
            name="status"
            label="Trạng thái"
            initialValue="active"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="active">Hiển thị</Option>
              <Option value="hidden">Ẩn</Option>
              <Option value="sold_out">Hết hàng</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="importPrice"
            label="Giá nhập(vào)"
            rules={[{ required: true, type: 'number', min: 0 }]}
          >
            <InputNumber placeholder="Nhập giá nhập" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá bán(ra thị trường)"
            rules={[{ required: true, type: 'number', min: 0 }]}
          >
            <InputNumber placeholder="Nhập giá gốc" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="salePrice"
            label="Giá khuyến mãi"
            rules={[
              { type: 'number', min: 0 },
            ]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="Nhập giá khuyến mãi (nếu có)" />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">Flash Sale (tùy chọn)</Divider>
      <Row gutter={16}>
        <Col md={12}>
          <Form.Item
            name="flashSale_discountedPrice"
            label="Giá Flash Sale"
            rules={[{ type: 'number', min: 0 }]}
          >
            <InputNumber style={{ width: '100%' }} placeholder="VD: 99000" />
          </Form.Item>
        </Col>

        <Col md={12}>
          <Form.Item
            name="flashSale"
            label="Thời gian Flash Sale"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value.length === 0) return Promise.resolve();
                  if (value.length !== 2 || value[0].isAfter(value[1])) {
                    return Promise.reject('Thời gian không hợp lệ');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Divider orientation="left">Hình ảnh & Mô tả</Divider>
      <Row gutter={16}>
        <Col md={12}>
          <Form.Item label="Hình ảnh (tối đa 5)">
            <Upload
              action="http://localhost:3000/api/upload"
              listType="picture-card"
              fileList={images}
              onChange={({ fileList }) => setImages(fileList)}
              maxCount={5}
              multiple
              accept="image/*"
            >
              {images.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Col>

        <Col md={12}>
          <Form.Item
            name="descriptionShort"
            label="Mô tả ngắn"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} placeholder="Mô tả ngắn gọn sản phẩm" />
          </Form.Item>

          <Form.Item
            name="descriptionLong"
            label="Mô tả chi tiết"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={5} placeholder="Mô tả chi tiết về sản phẩm" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Tạo sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProduct;
