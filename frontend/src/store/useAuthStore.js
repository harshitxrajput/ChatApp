import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = "http://localhost:5001";

export const useAuthstore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/get-profile");
            set({ authUser: res.data });
            get().connectSocket();
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
            get().connectSocket();
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
            get().connectSocket();
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
            get().disconnectSocket();
        }
        catch(error){
            toast.error(error.response.data.error);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try{
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile Updated successfully");
        }
        catch(error){
            toast.error(error.response.data.error);
        }
        finally{
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: async () => {
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })

        set({ socket: socket });
    },

    disconnectSocket: () => {
        if(get().socket?.connected) get().socket.disconnect();
    }
}))