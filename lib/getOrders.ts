// lib/getOrders.ts
import { addOrder as addOrderAPI, fetchOrders } from "@/api/orderAPI";

const userId = 2;

export const getOrders = async () => {
  const data = await fetchOrders();
  // Lọc theo userId
  return data.filter(order => order.userId === userId);
}

export const getOrderItemsByOrderId = async (orderId: number) => {
  const data = await fetchOrders();
  const order = data.find(order => order.orderId === orderId);
  return order ? order.orderItems : [];
};

export const addOrder = async (userId: number, newOrder: any) => {
  return await addOrderAPI(userId, newOrder);
}