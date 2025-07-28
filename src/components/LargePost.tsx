import React, { useEffect, useState } from 'react'
import { addCommentApi, getAllCommentsApi } from '../services/comments';
import Comment from './Comment';
import "./LargePost.scss"
import { useAuth } from '../context/userContext';


function LargePost({ post }: any) {
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const { token } = useAuth()
    console.log("pot", post)

    useEffect(() => {

        const getAllComments = async () => {

            try {
                const comments = await getAllCommentsApi(post.post_id, token);
                console.log("response", comments)
                setComments(comments.comments ?? [])
            } catch (error) {
                console.log("error while fetching all comments", error)
            }
        }

        getAllComments();
        // console.log("Love it a vieveve", res)
        // setComments(res)
    }, [commentInput])

    const handleAddComment = async () => {
        if (commentInput.trim() === "") return;

        // const newComment = {
        //   id: Date.now(),
        //   text: commentInput,
        //   username: "current_user", // You can dynamically replace this
        // };

        // setAllComments([newComment, ...allComments]);
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
            <div className='large-post-left'>
                <img className='large-post-posted-image' src={post.image_url} alt="" />
            </div>
            <div className='large-post-right'>

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

                <div className='all-comments'>
                    <p>FetchComments</p>
                    {
                        comments.length > 0 &&
                        (
                            comments.map((comment) => (
                                <Comment post_id={post.post_id}  {...comment} />
                            ))

                        )
                    }
                </div>

                <div className='post-comment'>
                    <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <button onClick={handleAddComment}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default LargePost