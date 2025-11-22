import { changeInfo as changeInfoAPI, getUser } from "@/api/userAPI";
import { User } from "@/type";
import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
    changeInfo: (info: Partial<User>) => Promise<void>;

};

const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),

    fetchAuthenticatedUser: async () => {
        try {
            set({ isLoading: true });

            // Cố định userId = 2
            const FIXED_userId = 2;

            // Gọi API để lấy user
            const user = await getUser(FIXED_userId);

            set({
                isAuthenticated: true,
                user,
                isLoading: false,
            });
        } catch (err) {
            console.log("fetchAuthenticatedUser error:", err);
            set({ isAuthenticated: false, user: null, isLoading: false });
        }
    },

    changeInfo: async (info: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({ isLoading: true });
        try {
            const updatedUser = await changeInfoAPI(currentUser.id, info);
            set({ user: { ...currentUser, ...updatedUser } });
        } catch (err) {
            console.log("Lỗi cập nhật info:", err);
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useAuthStore;
