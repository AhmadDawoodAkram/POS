import Product from "./Product.interface";

export default interface Cart {
  cart: Product[];
  onUpdateQuantity: (id: string, variantId: string, quantity: number) => void;
  isLoading: boolean;
  discountArr: any[];
  onRemove: (id: string, variantId: string) => void;
  selectedDiscounts: { [key: string]: string };
  handleDiscountChange: (cartKey: string, discountId: string) => void;
  billMode: string;
  setBillMode: (dic: string) => void;
  discounts: any[];
  isDiscountApplicableToItem: (discount: any, cartItem: Product) => boolean;
  selectedTax: { [key: string]: string };
  handleTaxChange: (cartKey: string, taxId: string) => void;
  taxes: any[];
  total: number;
  netTotal: number;
  discount: number;
  handleCheckout: () => void;
  setOrderTax: (val: string) => void;
  setOrderDiscount: (val: string) => void;
}
