import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useAuthstore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,
    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/get-profile");
            set({ authUser: res.data });
        }
        catch(error){
            console.log(`Error in checkAuth: ${error.message}`);
            set({ authUser: null });
        }
        finally{
            set({ isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
        
    }
}))