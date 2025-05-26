export interface Category {
  _id?: string;
  name: string;
  description?: string;
  parentId?: string | null;
  isDeleted?: boolean;
  deletedAt?: Date;
}
