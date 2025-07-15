import Product from "./Product.interface";

export default interface Cart {
  cart: Product[];
  onUpdateQuantity: (id: string, variantId: string, quantity: number) => void;
  isLoading: boolean;
  discountArr: any[];
  onRemove: (id: string, variantId: string) => void;
  selectedDiscounts: { [key: string]: string };
  handleDiscountChange: (cartKey: string, discountId: string) => void;
  autoDiscount: string;
  setAutoDiscount: (dic: string) => void;
  discounts: any[];
  isDiscountApplicableToItem: (discount: any, cartItem: Product) => boolean;
  total: number;
  netTotal: number;
  discount: number;
  handleCheckout: () => void;
}
