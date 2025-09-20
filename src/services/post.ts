const server = 'http://localhost:8080'
import type { ApiResponse, PostsData } from "../pages/Feed"

export const createPostApi = async (formData: FormData, token: string | null) => {
    console.log("token from post", token)
    try {
        const res = await fetch(server + "/post", {
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("Posted sucessfully", data)
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }

}

// for feed
export const getAllPosts = async (token: string | null): Promise<ApiResponse<PostsData>> => {
    try {

        const res = await fetch(server + "/post/getAllPosts", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        const data: ApiResponse<PostsData> = await res.json();
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        console.log("get all posts", data)
        return data;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}


export const getUserPosts = async (user_id: number, token: string | null) => {
    try {

        const res = await fetch(server + `/post/getUserPosts?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("get all posts", data)
        return data;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}