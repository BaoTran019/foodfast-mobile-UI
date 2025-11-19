import { MenuItem } from "@/type";
import { food_list } from "../assets/assets";

/**
 * Lấy danh sách món ăn (có thể lọc theo category hoặc tìm kiếm)
 * @param {string} [category] - Ví dụ: "Fried_Chicken", "Spaghetti", "Drink"
 * @param {string} [query] - Từ khóa tìm kiếm (ví dụ: "gà", "mì")
 * @returns {MenuItem[]} Danh sách món ăn phù hợp
 */
export const getMenu = (category?: string, query?: string): MenuItem[] => {
  let items = [...food_list];

  if (category && category !== "All") {
    items = items.filter((item) => item.category === category);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    items = items.filter((item) => item.name.toLowerCase().includes(lowerQuery));
  }

  return items;
};
