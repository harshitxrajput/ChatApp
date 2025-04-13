import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthstore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
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
        set({ isSigningUp: true });
        try{
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
        }
        catch(error){
            toast.error(error.response.data.error);
        }
        finally{
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try{
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        }
        catch(error){
            toast.error(error.response.data.error);
        }
        finally{
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try{
            await axiosInstance.get("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        }
        catch(error){
            toast.error(error.response.data.error);
        }
    }
}))