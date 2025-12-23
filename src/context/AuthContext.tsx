"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter, usePathname } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'STUDENT' | 'SELLER' | 'RIDER' | 'ADMIN';
    university_id?: string;
    whatsapp_number?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (access_token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    // Verify token and get user profile
                    const response = await api.get('/auth/me');
                    setUser(response.data);
                    setToken(storedToken);
                } catch (error) {
                    console.error("Session verification failed", error);
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = (newAccessToken: string, newUser: User) => {
        localStorage.setItem('token', newAccessToken);
        localStorage.setItem('user', JSON.stringify(newUser));
        setToken(newAccessToken);
        setUser(newUser);

        console.log('Login successful, user:', newUser);
        // Redirect based on role
        switch (newUser.role) {
            case 'SELLER':
                console.log('Redirecting to /seller/dashboard');
                router.push('/seller/dashboard');
                break;
            case 'RIDER':
                console.log('Redirecting to /delivery/dashboard');
                router.push('/delivery/dashboard');
                break;
            case 'ADMIN':
                console.log('Redirecting to /admin/dashboard');
                router.push('/admin/dashboard');
                break;
            default:
                console.log('Redirecting to /');
                router.push('/');
                break;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
