const server = 'http://localhost:8080'

export const profileApi = async (username: string, token: string | null) => {
    console.log("token from post", token)
    try {
        const res = await fetch(server + `/profile?username=${username}`, {
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
        console.log("user profile sucessfully", data)
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }

}


export const followApi = async (user_id: number, token: string | null) => {
    try {

        const res = await fetch(server + `/follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id })
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("user profile sucessfully", data)
        return data;

    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

export const unFollowApi = async (user_id: number, token: string | null) => {
    try {

        const res = await fetch(server + `/unfollow`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id })
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("unfollow sucessfully", data)
        return data;

    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

export const updateProfileApi = async (formData: FormData, token: string | null) => {
    try {
        // const response = await axios.put(`${server}/profile/update`, formData, {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        // return response.data;


        const res = await fetch(server + `/updateProfile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("get all posts", data)
        return data;
    } catch (error) {
        console.error("Update profile failed:", error);
        throw error
    }
};