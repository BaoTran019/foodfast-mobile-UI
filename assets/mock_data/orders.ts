import { food_list } from "../assets";
// initial orders
export const initial_orders = [
  {
    userId: "user1",
    orderId: 1,
    customer: "Nguyễn Văn A",
    phone: "0123456781",
    address: "An Dương Vương, Quân 5, tp.HCM",
    total: 125000,
    status: "new-orders",
    payment_method: "COD",
    date: "2025-10-20"
  },
  {
    userId: "user1",
    orderId: 13,
    customer: "Nguyễn Văn A",
    phone: "0123456781",
    address: "An Dương Vương, Quân 5, tp.HCM",
    total: 95000,
    status: "in-progress",
    payment_method: "COD",
    date: "2025-11-01"
  },
  {
    userId: "user1",
    orderId: 14,
    customer: "Nguyễn Văn A",
    phone: "0123456781",
    address: "An Dương Vương, Quân 5, tp.HCM",
    total: 145000,
    status: "on-delivery",
    payment_method: "Online payment",
    date: "2025-11-02"
  },
  {
    userId: "user1",
    orderId: 15,
    customer: "Nguyễn Văn A",
    phone: "0123456781",
    address: "An Dương Vương, Quân 5, tp.HCM",
    total: 120000,
    status: "completed",
    payment_method: "COD",
    date: "2025-11-03"
  },
];

// order items: liên kết orderId với menu item và price
export const order_items = [
  // order #1
  { orderId: 1, itemId: "1", quantity: 1, price: food_list.find(f => f.id === "1")!.price, subtotal: food_list.find(f => f.id === "1")!.price },
  { orderId: 1, itemId: "14", quantity: 1, price: food_list.find(f => f.id === "14")!.price, subtotal: food_list.find(f => f.id === "14")!.price },

  // order #13
  { orderId: 13, itemId: "3", quantity: 1, price: food_list.find(f => f.id === "3")!.price, subtotal: food_list.find(f => f.id === "3")!.price },
  { orderId: 13, itemId: "16", quantity: 2, price: food_list.find(f => f.id === "16")!.price, subtotal: 2 * food_list.find(f => f.id === "16")!.price },

  // order #14
  { orderId: 14, itemId: "7", quantity: 1, price: food_list.find(f => f.id === "7")!.price, subtotal: food_list.find(f => f.id === "7")!.price },
  { orderId: 14, itemId: "8", quantity: 1, price: food_list.find(f => f.id === "8")!.price, subtotal: food_list.find(f => f.id === "8")!.price },

  // order #15
  { orderId: 15, itemId: "5", quantity: 2, price: food_list.find(f => f.id === "5")!.price, subtotal: 2 * food_list.find(f => f.id === "5")!.price },
];
