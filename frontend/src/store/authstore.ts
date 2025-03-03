import { create } from "zustand";
import axios from "axios";

interface User{
    id: number;
    username: string;
}

interface AuthState{
    user: User | null;
    token : string | null;
    loading: boolean;
    error:string | null;
    login: (username:string, password:string) => Promise<void>;
    register: (username:string, password:string) => Promise<void>;
    logout: () => void;

}

export const useAuthStore  = create<AuthState>((set)=>({
    user: null,
    token: localStorage.getItem("token"),
    loading: false,
    error: null,
    login: async (username:string, password:string) => {
        try{
            set({loading:true, error:null});
            const response = await axios.post("http://localhost:8000/api/token/", {username, password});
            localStorage.setItem("token", response.data.access);
            set({token: response.data.access, loading:false, user: response.data.user});
        }catch(error){
            const errorMessage = (error as any)?.response?.data?.message || "An unknown error occurred";
            set({loading:false, error: errorMessage});
        }
    },
    register: async (username:string, password:string) => {
        try{
            set({loading:true, error:null});
            const response = await axios.post("http://localhost:8000/api/users/", {username, password});
            set({loading:false});
        }catch(error){
            const errorMessage = (error as any)?.response?.data?.message || "An unknown error occurred";
            set({loading:false, error: errorMessage});
        }
    },
    logout: () => {
        set({user:null, token:null});
        localStorage.removeItem("token");
    }

}))