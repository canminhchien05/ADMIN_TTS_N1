export interface IProduct {
  _id?: string;
  name: string;
  descriptionShort?: string;
  descriptionLong?: string;
  price?: number;
  importPrice?: number;
  salePrice?: number;
  flashSale_discountedPrice?: number;
  flashSale_start?: string;
  flashSale_end?: string;
  images: string[];
  brandId?: string;
  categoryId?: string;
  totalPurchased?: number;
  status: 'active' | 'hidden' | 'sold_out';
  isDeleted?: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
