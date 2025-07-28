import React from 'react'
import "./Post.scss"
import Like from './Like'

function Post({ post, handleEnlargedPost }: any) {
    console.log("post ->", post)
    console.log("username", post.avatar_url)
    return (
        <div className='post-container'>
            <div className='post-header'>

                <div className='header-wrapper'>
                    <img className='profile-picture' src={post.avatar_url} alt="" />
                    <div className='post-meta-info'>
                        <div className='post-meta-info-left'>
                            <p>{post.username}</p>
                            <p>3 hours ago</p>
                        </div>
                        <div className='post-meta-info-right'>
                            <div>Follow</div>
                            <div>Save</div>
                        </div>
                        <div>
                            <p>:</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className='post-body'>
                <div>{post.content}</div>
                <div>
                    <img className='posted-image' src={post.image_url} alt="" />
                </div>
            </div>
            <div className='post-footer'>
                {/* <div>{(post.reaction_array ? post.reaction_array.length : 0)} Like</div> */}
                <Like post={post} />
                <div onClick={() => handleEnlargedPost(post.post_id)}>
                    <p>Comment</p>
                </div>
            </div>
        </div>
    )
}

export default Post