import React from 'react'

interface CommentProps {
    post_id: number;
    comment: string;
    username: string;
    created_at: string;
    avatar_url: string;
}

function Comment({ post_id, comment, username, created_at, avatar_url }: CommentProps) {
    return (
        <div className='single-comment'>
            <div> <img className='profile-picture' src={avatar_url} />  </div>
            <div>
                <div className='single-comment-first'>
                    <span>{username}</span>
                    <span>{comment}</span>
                </div>
                <p>{created_at}</p>
            </div>
        </div>
    )
}

export default Comment