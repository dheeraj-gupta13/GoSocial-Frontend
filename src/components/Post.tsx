import React, { useEffect, useState } from 'react'
import "./Post.scss"
import Like from './Like'
import { getAllCommentsApi } from '../services/comments'
import { useAuth } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import Follow from './Follow'
import type { PostType } from '../pages/Feed';


interface PostProps {
    post: PostType;
    handleEnlargedPost: (post_id: number) => void;
}

function Post({ post, handleEnlargedPost }: PostProps) {

    const [commentCount, setCommentCount] = useState(0);
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {

        const getAllComments = async () => {

            try {
                const res = await getAllCommentsApi(post.post_id, token);
                console.log("response", res)
                setCommentCount(res.data.length ?? 0)
            } catch (error) {
                console.log("error while fetching all comments", error)
            }
        }

        getAllComments();
    }, [])

    const redirectToUser = (user: string) => {
        navigate(`profile/${user}`)
    }

    return (
        <div className='post-container'>
            <div className='post-header'>

                <div className='header-wrapper'>
                    <img className='profile-picture' src={post.avatar_url} alt="" />
                    <div className='post-meta-info'>
                        <div className='post-meta-info-left'>
                            <p onClick={() => redirectToUser(post.username)}>{post.username}</p>
                            <p>{post.created_at}</p>
                        </div>
                        <div className='post-meta-info-right'>

                            {/* <div>Follow</div> */}
                            <div>{(post.do_I_follow == -1) ? "   " : <Follow doIFollow={post.do_I_follow} user_id={post.user_id} profile={false} />}</div>
                            <FaRegBookmark />
                            {/* <FaBookmark /> */}
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
                    <p>{commentCount} Comment</p>
                </div>
            </div>
        </div>
    )
}

export default Post