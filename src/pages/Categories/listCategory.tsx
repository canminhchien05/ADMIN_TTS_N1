import { useMemo, useState } from "react";
import { Table, Button, Popconfirm, Tag, Space, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/date.util";
import { useDeleteCategory, useDeleteForceCategory, useGetCategories, useRestoreCategory } from "../../services";

const CategoryList = () => {
  const navigate = useNavigate();
  const [showDeleted, setShowDeleted] = useState(false); // Toggle hiển thị
  const { mutate: onDeleteCategory } = useDeleteCategory();
  const { data: categories, isLoading } = useGetCategories();
  // const { mutate } = useHandGetCategories();
  const { mutate: onRestoreCategory } = useRestoreCategory();
  const { mutate: onDeleteForece } = useDeleteForceCategory();

  // Lọc hiển thị nếu không muốn thấy isDeleted === true
  const filteredData = useMemo(() => {
    return showDeleted
      ? categories
      : categories?.filter((cat) => !cat.isDeleted)
  }, [categories, showDeleted]);

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "name",
    },
    {
      title: "Danh mục cha",
      dataIndex: ["parentId", "name"], // truy cập parentId.name
      render: (text) => text || <em>Không có (Danh mục gốc)</em>, // nếu null hiện "Không có"
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "isDeleted",
      render: (isDeleted) =>
        isDeleted ? <Tag color="red">Đã xóa</Tag> : <Tag color="green">Hoạt động</Tag>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (text) => formatDate(text),
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="default"
              onClick={() => navigate(`/admin/categories/edit/${record._id}`)}
              disabled={record.isDeleted}
            >
              Cập nhật
            </Button>
            {!record.isDeleted ? (
              <Popconfirm
                title="Bạn có chắc muốn chuyển vào thùng rác?"
                onConfirm={() => onDeleteCategory(record._id)}
              >
                <Button danger>Chuyển vào thùng rác</Button>
              </Popconfirm>
            ) : (
              <>
                <Button type="primary" onClick={() => onRestoreCategory(record._id)}>
                  Khôi phục
                </Button>
                <Popconfirm
                  title="Bạn có chắc muốn xóa vĩnh viễn?"
                  onConfirm={() => onDeleteForece(record._id)}
                >
                  <Button danger type="dashed">
                    Xóa vĩnh viễn
                  </Button>
                </Popconfirm>
              </>
            )}
          </Space>
        );
      },
    },
  ];


  return (
    <>
     <h2>Danh sách danh mục</h2>
      <div style={{ marginBottom: 16 }}>
        <Switch
          checked={showDeleted}
          onChange={() => setShowDeleted(!showDeleted)}
        />
        <span style={{ marginLeft: 8 }}>
          {showDeleted ? "Hiển thị tất cả (bao gồm đã xóa)" : "Chỉ hiển thị hoạt động"}
        </span>
      </div>
      <Table
        rowKey="_id"
        loading={isLoading}
        columns={columns}
        dataSource={filteredData}
      />
    </>
  );
};

export default CategoryList;
