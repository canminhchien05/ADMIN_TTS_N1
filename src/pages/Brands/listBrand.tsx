import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
  RollbackOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios.util";

const ListBrand = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [form] = Form.useForm();

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/brands?includeDeleted=true");
      setBrands(response.data);
    } catch {
      message.error("Không thể tải danh sách thương hiệu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSoftDelete = async (id) => {
    try {
      await axiosInstance.delete(`/brands/${id}`);
      message.success("Đã xóa mềm thương hiệu.");
      fetchBrands();
    } catch {
      message.error("Xóa mềm thất bại.");
    }
  };

  const handleRestore = async (id) => {
    try {
      await axiosInstance.patch(`/brands/${id}/restore`);
      message.success("Khôi phục thành công.");
      fetchBrands();
    } catch {
      message.error("Khôi phục thất bại.");
    }
  };

  const handleForceDelete = async (id) => {
    try {
      await axiosInstance.delete(`/brands/${id}/force`);
      message.success("Đã xóa vĩnh viễn.");
      fetchBrands();
    } catch {
      message.error("Xóa vĩnh viễn thất bại.");
    }
  };

  const showEditModal = (brand) => {
    setEditingBrand(brand);
    form.setFieldsValue(brand);
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      await axiosInstance.put(
        `/brands/${editingBrand._id}`,
        values
      );
      message.success("Cập nhật thành công.");
      setIsModalVisible(false);
      fetchBrands();
    } catch (error) {
      message.error("Cập nhật thất bại.");
    }
  };

  const columns = [
    {
      title: "Tên thương hiệu",
      dataIndex: "name",
      key: "name",
      responsive: ["md"],
    },
    {
      title: "Logo",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (logo) =>
        logo ? (
          <img
            src={logo}
            alt="logo"
            style={{
              width: 60,
              height: 40,
              objectFit: "contain",
              border: "1px solid #eee",
              borderRadius: 4,
              padding: 4,
              background: "#fff",
            }}
          />
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
      render: (isDeleted) =>
        isDeleted ? (
          <Tag color="red">Đã xóa</Tag>
        ) : (
          <Tag color="green">Hoạt động</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <Space wrap>
          {!record.isDeleted ? (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => showEditModal(record)}
                type="primary"
                size="small"
              >
                Cập nhật
              </Button>
              <Popconfirm
                title="Bạn chắc chắn muốn xóa?"
                onConfirm={() => handleSoftDelete(record._id)}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button danger icon={<DeleteOutlined />} size="small">
                  Xóa
                </Button>
              </Popconfirm>
            </>
          ) : (
            <>
              <Popconfirm
                title="Khôi phục thương hiệu này?"
                onConfirm={() => handleRestore(record._id)}
              >
                <Button icon={<RollbackOutlined />} type="default" size="small">
                  Khôi phục
                </Button>
              </Popconfirm>
              <Popconfirm
                title="Xóa vĩnh viễn? Không thể khôi phục!"
                onConfirm={() => handleForceDelete(record._id)}
              >
                <Button
                  danger
                  icon={<StopOutlined />}
                  size="small"
                  style={{ backgroundColor: "#ff4d4f", color: "#fff" }}
                >
                  Xóa vĩnh viễn
                </Button>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          icon={<ReloadOutlined />}
          onClick={fetchBrands}
          loading={loading}
        >
          Tải lại
        </Button>
      </Space>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={brands}
        loading={loading}
        bordered
        size="middle"
        pagination={{ pageSize: 8 }}
      />

      <Modal
        title="Cập nhật thương hiệu"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdate}
        okText="Lưu"
        cancelText="Hủy"
        centered
        width={500}
        bodyStyle={{ paddingTop: 10 }}
      >
        <Form
          form={form}
          layout="vertical"
          size="middle"
          colon={false}
          labelAlign="left"
        >
          <Form.Item
            name="name"
            label="Tên thương hiệu"
            rules={[
              { required: true, message: "Vui lòng nhập tên thương hiệu" },
            ]}
          >
            <Input placeholder="Nhập tên thương hiệu" />
          </Form.Item>

          <Form.Item
            name="logoUrl"
            label="URL Logo"
            rules={[{ type: "url", message: "URL không hợp lệ" }]}
          >
            <Input placeholder="https://example.com/logo.png" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea
              placeholder="Mô tả ngắn gọn"
              rows={4}
              showCount
              maxLength={200}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListBrand;
