import React, { useState } from 'react';
import { useAuth } from '../context/userContext';
import { loginApi } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // 👈 same file as Register

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginApi(form);
            login(form.username, data.token);
            navigate('/feed');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-page">
            {/* Left image */}
            <div className="auth-left">
                <img
                    src="https://undraw.co/api/illustrations/login.svg"
                    alt="Login Visual"
                />
            </div>

            {/* Right form */}
            <div className="auth-right">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2 className="auth-title">Welcome Back 👋</h2>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />

                    <button type="submit" className="auth-btn">
                        Login
                    </button>

                    <div className="auth-links">
                        <a href="#">Forgot Password?</a>
                        <a href="/register">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
