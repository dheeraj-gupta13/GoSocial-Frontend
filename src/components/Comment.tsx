import React from 'react'

function Comment({ post_id, comment, username, created_at }) {
    return (
        <div>
            <p>{username}</p>
            <p>{comment}</p>
            <p>{"2 hours ago"}</p>
        </div>
    )
}

export default Comment