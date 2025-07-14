import CartItem from "./CartItem.interface";

export default interface CartContainerProps {
  cart: CartItem[];
  resetCart: () => {};
  onRemove: (id: string, variantId: string) => void;
  onUpdateQuantity: (id: string, variantId: string, quantity: number) => void;
  discounts: any[];
}
