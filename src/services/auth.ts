const server = 'http://localhost:8080'

export const registerApi = async (formData: { username: string, email: string, password: string }) => {
    try {
        const res = await fetch(server + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("User registered", data)
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }

}

export const loginApi = async (formData: { username: string, email: string, password: string }) => {
    try {
        const res = await fetch(server + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("User logged in", data)
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }

}

export const validateTokenApi = async (token: string | null) => {
    try {

        const res = await fetch(server + "/validateToken", {
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
        console.log("token validation...", data)
        return data;
    } catch (error) {
        console.error('Error during getting comments:', error);
        throw error;
    }
}

// export default registerApi