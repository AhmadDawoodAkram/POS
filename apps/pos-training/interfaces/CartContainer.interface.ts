import Product from "./Product.interface";

export default interface CartContainerProps {
  cart: Product[];
  resetCart: () => {};
  onRemove: (id: string, variantId: string) => void;
  onUpdateQuantity: (id: string, variantId: string, quantity: number) => void;
  discounts: any[];
  taxes: any[];
}
