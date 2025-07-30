const server = 'http://localhost:8080'

export const profileApi = async (user_id: number, token: string | null) => {
    console.log("token from post", token)
    try {
        const res = await fetch(server + `/profile?user_id=${user_id}`, {
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
