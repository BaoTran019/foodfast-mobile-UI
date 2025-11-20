import { MenuItem } from "@/type";
import { fetchMenu } from "../api/productAPI";

/**
 * Lấy danh sách món ăn (có thể lọc theo category hoặc tìm kiếm)
 * @param {string} [category] - Ví dụ: "Fried_Chicken", "Spaghetti", "Drink"
 * @param {string} [query] - Từ khóa tìm kiếm (ví dụ: "gà", "mì")
 * @returns {MenuItem[]} Danh sách món ăn phù hợp
 */
export const getMenu = async (category?: string, query?: string): Promise<MenuItem[]> => {
  const items = await fetchMenu();

  // map backend JSON về interface MenuItem
  const mappedItems: MenuItem[] = items.map(item => ({
    id: item.productId.toString(),
    name: item.productName,
    image: item.imageUrl, // hoặc require/resolve nếu muốn
    price: item.price,
    description: item.description,
    category: item.category.categoryName,
  }));

  let filtered = [...mappedItems];

  if (category && category !== "All") {
    filtered = filtered.filter(item => item.category === category);
  }

  if (query) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(item => item.name.toLowerCase().includes(lowerQuery));
  }

  return filtered;
};
