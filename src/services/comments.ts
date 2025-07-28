const server = 'http://localhost:8080'

export const addCommentApi = async (commentData: { post_id: number, comment: string }, token: string) => {
    try {
        const res = await fetch(server + "/comment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(commentData)
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("Comment added, ", data)
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }

}


export const getAllCommentsApi = async (post_id: number, token: string) => {
    try {
        const res = await fetch(server + `/comment?id=${post_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // body: JSON.stringify(commentData)
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Something went wrong');
        }
        const data = await res.json();
        console.log("get all comments, ", data)
        return data;
    } catch (error) {
        console.error('Error during getting comments:', error);
        throw error;
    }

}