const server = 'http://localhost:8080'

interface ReactionType {
    post_id: number,
    reaction_type: number
}

export const likeApi = async (reaction: ReactionType, token: string | null) => {
    console.log("token from post", token)
    try {
        const res = await fetch(server + "/like", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reaction)
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

export const unLikeApi = async (post_id: number, token: string | null) => {
    try {
        const res = await fetch(server + `/like?post_id=${post_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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

export const getReactionType = async (post_id: number, token: string | null) => {
    try {
        const res = await fetch(server + `/reactionType?post_id=${post_id}`, {
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
        console.log("Reaction id", data)
        return data;

    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
}