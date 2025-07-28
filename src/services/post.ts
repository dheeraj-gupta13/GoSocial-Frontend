const server = 'http://localhost:8080'

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
export const getAllPosts = async (token: string | null) => {
    try {

        const res = await fetch(server + "/post/getAllPosts", {
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