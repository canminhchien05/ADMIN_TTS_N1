export interface IBlog {
  _id: string; // ObjectId dưới dạng chuỗi
  title: string; // Tiêu đề bài viết
  slug: string; // Đường dẫn thân thiện (SEO)
  coverImage: string; // URL ảnh bìa
  content: string; // Nội dung bài viết (HTML hoặc Markdown)
  tags: string[]; // Danh sách tag
  authorId: string; // ObjectId của nhà thiết kế (dưới dạng chuỗi)
  published: boolean; // Trạng thái công khai
  createdAt: string; // Thời gian tạo (ISO format hoặc datetime string)
}
