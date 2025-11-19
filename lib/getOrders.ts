// lib/getOrders.ts
import { initial_orders, order_items } from "@/assets/mock_data/orders";

export const getOrdersByUser = (userId: string) => {
  return initial_orders.filter(order => order.userId === userId);
};

export const getOrderItemsByOrderId = (orderId: number) => {
  return order_items.filter(item => item.orderId === orderId);
};