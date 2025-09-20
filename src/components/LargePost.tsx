import React, { useEffect, useState } from 'react'
import { addCommentApi, getAllCommentsApi } from '../services/comments';
import Comment from './Comment';
import "./LargePost.scss"
import { useAuth } from '../context/userContext';
import Follow from './Follow';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import type { PostType } from '../pages/Feed';


export interface CommentType {
    comment_id: number;
    user_id: number;
    username: string;
    avatar_url: string;
    comment: string;
    created_at: string;
}

interface LargePostProps {
    post: PostType | null;
    handleEnlargedPostCancel: () => void;
}

function LargePost({ post, handleEnlargedPostCancel }: LargePostProps) {

    if (!post) return null; // don't render anything if post is null
    const [commentInput, setCommentInput] = useState<string>("");
    const [comments, setComments] = useState<CommentType[]>([]);
    const { token } = useAuth()
    const [errorMsg, setErrorMsg] = useState<string>("");


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await getAllCommentsApi(post.post_id, token);
                console.log("response", comments)
                if (res.success && res.data) {
                    console.log("API call", res.data)
                    setComments(res.data ?? [])
                } else {
                    console.error("API Error:", res.error);
                    setErrorMsg(res.error?.message || "Failed to fetch posts");
                }

            } catch (error) {
                console.log(error)
                setErrorMsg("Something went wrong. Please try again later.");
            }
        }

        fetchComments();
    }, [commentInput])

    const handleAddComment = async () => {
        if (commentInput.trim() === "") return;

        try {
            const res = await addCommentApi({ post_id: post.post_id, comment: commentInput }, token);
            console.log("comment added frontend", res);
        } catch (error) {
            console.log("comment error from frontend", error)
        }
        setCommentInput("");
    };

    return (
        <div className='large-post'>
            <div className='large-post-cross' onClick={handleEnlargedPostCancel}><RxCross1 /> </div>
            <div className='large-post-left'>
                <img className='large-post-posted-image' src={post.image_url} alt="" />
            </div>
            <div className='large-post-right'>

                <div className='header-wrapper'>
                    <img className='profile-picture' src={post.avatar_url} alt="" />
                    <div className='post-meta-info'>
                        <div className='post-meta-info-left'>
                            <p>{post.username}</p>
                            <p>{post.created_at}</p>
                        </div>
                        <div className='post-meta-info-right'>
                            <div>{(post.do_I_follow == -1) ? "   " : <Follow doIFollow={post.do_I_follow} user_id={post.user_id} profile={false} />}</div>
                            <FaRegBookmark />
                        </div>
                        <div>
                            <p>:</p>
                        </div>
                    </div>
                </div>

                <div className='separator'></div>

                <div className='post-content'>
                    <p>{post.content}</p>
                </div>

                <div className='all-comments'>
                    {/* <p>FetchComments</p> */}
                    {
                        comments.length > 0 &&
                        (
                            comments.map((comment) => (
                                <Comment post_id={post.post_id}  {...comment} />
                            ))

                        )
                    }
                </div>

                <div className='separator'></div>

                <div className='post-comment'>

                    <input
                        type="text"
                        className='post-comment-input'
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button className='post-comment-btn' onClick={handleAddComment}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default LargePost