/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Switch, message, Tag } from 'antd';
import axios from 'axios';
import type { IBlog } from '../../types/blog.types';

const { TextArea } = Input;

const UpdateBlogPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IBlog | null>(null);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/blogs/${blogId}`);
        setFormData(res.data);
      } catch (error) {
        message.error('Không thể tải bài viết');
        console.log(error);
        navigate('/admin/blogs');
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleChange = (field: keyof IBlog, value: any) => {
    if (!formData) return;

    const updated: IBlog = {
      ...formData,
      [field]: value,
    };

    setFormData(updated);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (!formData) return;

    const updated: IBlog = {
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    };

    setFormData(updated);
  };

  const handleAddTag = () => {
    if (!formData || !tagInput.trim()) return;

    const newTag = tagInput.trim();

    if (formData.tags.includes(newTag)) {
      message.warning('Tag đã tồn tại');
      return;
    }

    const updated: IBlog = {
      ...formData,
      tags: [...formData.tags, newTag],
    };

    setFormData(updated);
    setTagInput('');
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/blogs/${blogId}`, formData);
      message.success('Cập nhật thành công');
      navigate('/admin/blogs');
    } catch (error) {
      message.error('Lỗi khi cập nhật bài viết');
      console.log(error);
    }
  };

  if (!formData) return <div className="p-6 text-black">Đang tải...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-black">Cập nhật bài viết</h2>

      <label className="block mb-2 text-black">Tiêu đề</label>
      <Input
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
        className="mb-4"
      />

      <label className="block mb-2 text-black">Slug</label>
      <Input
        value={formData.slug}
        onChange={(e) => handleChange('slug', e.target.value)}
        className="mb-4"
      />

      <label className="block mb-2 text-black">Ảnh bìa (URL)</label>
      <Input
        value={formData.coverImage}
        onChange={(e) => handleChange('coverImage', e.target.value)}
        className="mb-4"
      />
      {formData.coverImage && (
        <img
          src={formData.coverImage}
          alt="cover"
          className="mb-4 w-48 h-32 object-cover rounded"
        />
      )}

      <label className="block mb-2 text-black">Nội dung</label>
      <TextArea
        rows={6}
        value={formData.content}
        onChange={(e) => handleChange('content', e.target.value)}
        className="mb-4"
      />

      <label className="block mb-2 text-black">Tags</label>
      <div className="flex gap-2 mb-2 flex-wrap">
        {formData.tags.map(tag => (
          <Tag
            key={tag}
            closable
            onClose={() => handleRemoveTag(tag)}
            className="cursor-pointer"
          >
            {tag}
          </Tag>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Nhập tag mới"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onPressEnter={handleAddTag}
        />
        <Button onClick={handleAddTag}>Thêm tag</Button>
      </div>

      <label className="block mb-2 text-black">Công khai</label>
      <Switch
        checked={formData.published}
        onChange={(checked) => handleChange('published', checked)}
        className="mb-6"
      />

      <div className="flex justify-end gap-4">
        <Button onClick={() => navigate('/admin/blogs')}>Huỷ</Button>
        <Button type="primary" onClick={handleSubmit} disabled={!formData}>
          Cập nhật
        </Button>
      </div>
    </div>
  );
};

export default UpdateBlogPage;
