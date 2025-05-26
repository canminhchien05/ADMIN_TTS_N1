export interface IVoucher {
    _id: string
  code: string // Mã giảm giá người dùng sẽ nhập (VD: SUMMER20)
  description: string // Mô tả chương trình khuyến mãi
  discountType: string // Kiểu giảm giá: "percent" (theo %) hoặc "fixed" (giảm số tiền cố định)
  discountValue: number // Giá trị giảm: VD 20 (tức là 20% hoặc 20.000đ tuỳ loại)
  minOrderAmount: number // Áp dụng nếu đơn ≥ số tiền này
  maxUsage: number // Số lần mã này được sử dụng tổng cộng
  usedCount: number // Đã được sử dụng bao nhiêu lần
  expiresAt: Date // Hạn dùng mã giảm giá
  createdAt: Date
}
