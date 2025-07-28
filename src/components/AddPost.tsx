import React, { useState } from 'react';
// import { useAuth } from '../context/userContext';
import useAuthToken from '../hooks/useAuthToken';
import { createPostApi } from '../services/post';
import { useAuth } from '../context/userContext';
// import { registerApi } from '../services/auth';



const AddPost: React.FC = () => {
    // const { token, user } = useAuth();
    const { token } = useAuth();
    const [form, setForm] = useState({
        content: '',
        image_url: '',
    });

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Post form submitted:', form);

        try {
            console.log("TTTTTTTTT", token)
            const data = await createPostApi(form, token)
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Post</h2>

                <input
                    type="text"
                    name="content"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="text"
                    name="image_url"
                    placeholder="Image Url"
                    value={form.image_url}
                    onChange={handleChange}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
