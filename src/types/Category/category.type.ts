export interface Category {
  _id?: string;
  name: string;
  description?: string;
  parentId?: string | Category | null;
  isDeleted?: boolean;
}