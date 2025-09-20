import React, { useState } from 'react';
import { registerApi } from '../services/auth';
import './Auth.css'; // 👈 shared auth styles

const Register: React.FC = () => {
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
        console.log('Register form submitted:', form);

        try {
            const data = await registerApi(form);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="auth-page">
            {/* Left side image */}
            <div className="auth-left">
                <img
                    src="https://undraw.co/api/illustrations/sign_up.svg"
                    alt="Register Visual"
                />
            </div>

            {/* Right side form */}
            <div className="auth-right">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2 className="auth-title">Create Account 🚀</h2>

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
                        Register
                    </button>

                    <div className="auth-links">
                        <a href="/login">Already have an account? Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
