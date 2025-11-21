// lib/getOrders.ts
import { addOrder as addOrderAPI, fetchOrders } from "@/api/orderAPI";
import useAuthStore from "@/store/auth.store";


export const getOrders = async () => {
  const userId = useAuthStore.getState().user?.id;
  const data = await fetchOrders();
  // Lọc theo userId
  return data.filter(order => order.userId === userId);
}

export const getOrderItemsByOrderId = async (orderId: number) => {
  const data = await fetchOrders();
  const order = data.find(order => order.orderId === orderId);
  return order ? order.orderItems : [];
};

export const addOrder = async (newOrder: any) => {
  const userId = useAuthStore.getState().user?.id;
  if (!userId) return;
  console.log(newOrder)
  return await addOrderAPI(userId, newOrder);
}