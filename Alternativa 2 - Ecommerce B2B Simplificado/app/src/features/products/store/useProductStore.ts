import { create } from "zustand";

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  basePrice: number;
  unit: string;
  stock: number;
  minOrderQuantity: number;
  status: "ACTIVE" | "INACTIVE";
}

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
    // Note: Calling a server service directly from a client component causes a build error.
    // In a real app, this would be a fetch() call to an API route. 
    // Using mock data directly here for the B2B frontend demo.
    const mockProducts: Product[] = [
      { id: "1", sku: "SAL-FIL-001", name: "Premium Salmon Fillet", category: "Salmon", basePrice: 285, unit: "kg", stock: 12, minOrderQuantity: 5, status: "ACTIVE" },
      { id: "2", sku: "SHR-JUM-002", name: "Jumbo Shrimp (16/20)", category: "Shrimp", basePrice: 420, unit: "kg", stock: 25, minOrderQuantity: 10, status: "ACTIVE" },
      { id: "3", sku: "OCT-FRE-001", name: "Fresh Whole Octopus", category: "Octopus", basePrice: 350, unit: "kg", stock: 18, minOrderQuantity: 3, status: "ACTIVE" },
      { id: "4", sku: "TUN-YEL-001", name: "Yellowfin Tuna", category: "Tuna", basePrice: 520, unit: "kg", stock: 45, minOrderQuantity: 5, status: "ACTIVE" },
      { id: "5", sku: "SHR-PAC-003", name: "Pacific Shrimp", category: "Shrimp", basePrice: 180, unit: "kg", stock: 60, minOrderQuantity: 20, status: "ACTIVE" },
      { id: "6", sku: "SAL-SMO-002", name: "Premium Smoked Salmon", category: "Salmon", basePrice: 450, unit: "kg", stock: 8, minOrderQuantity: 2, status: "ACTIVE" },
      { id: "7", sku: "BAS-FIL-001", name: "Fresh Sea Bass Fillet", category: "Sea Bass", basePrice: 310, unit: "kg", stock: 15, minOrderQuantity: 5, status: "ACTIVE" },
      { id: "8", sku: "LOB-TAL-001", name: "Lobster Tail", category: "Lobster", basePrice: 890, unit: "kg", stock: 3, minOrderQuantity: 2, status: "ACTIVE" },
    ];
    set({ products: mockProducts, filteredProducts: mockProducts, isLoading: false });
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
