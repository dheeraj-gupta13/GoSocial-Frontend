import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateTokenApi } from '../services/auth';

// interface User {
//     id: string;
//     username: string;
//     email: string;
// }

interface AuthContextType {
    user: string | null;
    token: string | null;
    login: (user: string, token: string) => void;
    logout: () => void;
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const validateToken = async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            await validateTokenApi(token); // Assume this makes a request to backend

        } catch (err) {
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // const storedUser = localStorage.getItem('user');
        // const storedToken = localStorage.getItem('token');
        // if (storedUser && storedToken) {
        //     setUser(JSON.parse(storedUser));
        //     setToken(storedToken);
        // }
        // setLoading(false); // Set loading false once token is fetched
        const initAuth = async () => {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);

                try {
                    await validateTokenApi(storedToken); // Validate with backend
                } catch (err) {
                    logout(); // Token invalid or expired
                }
            }

            setLoading(false); // Only set loading false after validation completes
        };

        initAuth();
    }, []);

    const login = (user: string, token: string) => {
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
