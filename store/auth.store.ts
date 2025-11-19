import { User } from "@/type";
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>; // thêm hàm mock
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: true,   // mặc định luôn đăng nhập
    user: {                  // set user cố định
        id: "user1",
        name: "Nguyen Van A",
        email: "user1@example.com"
    } as User,
    isLoading: false,

    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),

    // mock fetchAuthenticatedUser để RootLayout vẫn gọi được
    fetchAuthenticatedUser: async () => {
        set({ isLoading: true });
        await new Promise((res) => setTimeout(res, 200)); // giả lập delay
        set({
            isAuthenticated: true,
            user: {
                id: "user1",
                name: "Nguyen Van A",
                email: "user1@example.com"
            } as User,
            isLoading: false
        });
    }
}));

export default useAuthStore;
