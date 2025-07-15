import Product from "@/interfaces/Product.interface";
import { create } from "zustand";

interface ProductsState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (items) => set({ products: items }),
}));
