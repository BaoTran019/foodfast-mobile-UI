// cart.store.ts
import { addToCartApi, clearCartApi, getCart, removeItemApi, updateQuantityApi } from "@/api/cartAPI";
import useAuthStore from "@/store/auth.store";
import { CartItemType, CartStore } from "@/type";
import { create } from "zustand";

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  fetchCart: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    const data = await getCart(userId);
    // map backend JSON sang CartItemType
    const items: CartItemType[] = data.cartItems.map((item: any) => ({
      id: item.productId,
      name: item.productName,
      price: item.price,
      image: item.imageUrl,
      quantity: item.quantity,
    }));
    set({ items });
  },

  addItem: async (productId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    await addToCartApi(userId, productId, 1);
    await get().fetchCart();
},

increaseQty: async (productId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    await updateQuantityApi(userId, productId, 1);
    await get().fetchCart();
},

decreaseQty: async (productId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    await updateQuantityApi(userId, productId, -1);
    await get().fetchCart();
},

removeItem: async (productId) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    await removeItemApi(userId, productId);
    await get().fetchCart();
},

  clearCart: async () => {

    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    await clearCartApi(userId);
    set({ items: [] });
  },

  getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  getTotalPrice: () => get().items.reduce((sum, i) => sum + i.quantity * i.price, 0),
}));
