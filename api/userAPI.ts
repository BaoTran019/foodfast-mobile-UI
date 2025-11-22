import { User } from "@/type";
import config from "./config.json";

const { SERVER_API } = config;
const BASE_URL = `${SERVER_API}/api/users`;

// ====================== GET USER ======================
export const getUser = async (userId: number): Promise<User> => {
  const res = await fetch(`${BASE_URL}/${userId}`);

  if (!res.ok) {
    throw new Error(`Không lấy được user. Status: ${res.status}`);
  }

  const raw = await res.json();

  // Map JSON backend -> type User
  const user: User = {
    id: raw.userId,
    fullName: raw.fullName,
    email: raw.email,
    phone: raw.phone,
    address: raw.address,
  };

  return user;
};

// ===================== CHANGE INFO =====================
export const changeInfo = async (
  userId: number,
  info: Partial<User>
): Promise<User> => {
  try {
    const res = await fetch(`${BASE_URL}/change-info/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const raw = await res.json();

    // Map JSON backend -> User
    const updatedUser: User = {
      id: raw.userId,
      fullName: raw.fullName,
      email: raw.email,
      phone: raw.phone,
      address: raw.address,
    };

    return updatedUser;
  } catch (err) {
    console.log("Lỗi khi cập nhật thông tin:", err);
    throw err;
  }
};
