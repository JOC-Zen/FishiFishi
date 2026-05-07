import { create } from "zustand";
import { Product, ProductService } from "../services/ProductService";

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  searchQuery: string;
  activeCategory: string;
  
  // Actions
  fetchProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string) => void;
}

/**
 * useProductStore
 * Manages the global state for the product catalog.
 */
export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  isLoading: false,
  searchQuery: "",
  activeCategory: "All",

  fetchProducts: async () => {
    set({ isLoading: true });
    const products = await ProductService.getAllProducts();
    set({ products, filteredProducts: products, isLoading: false });
    get().setSearchQuery(get().searchQuery); // Re-apply filters
  },

  setSearchQuery: (query: string) => {
    const { products, activeCategory } = get();
    const filtered = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(query.toLowerCase()) || 
                           p.sku.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    set({ searchQuery: query, filteredProducts: filtered });
  },

  setActiveCategory: (category: string) => {
    const { products, searchQuery } = get();
    const filtered = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === "All" || p.category === category;
      return matchesSearch && matchesCategory;
    });
    set({ activeCategory: category, filteredProducts: filtered });
  },
}));
