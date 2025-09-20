import React, { useEffect, useState } from 'react'
import { getUserPosts } from '../services/post'
import { useAuth } from '../context/userContext'
import "./ProfilePosts.css"
import Post from './Post'
import LargePost from './LargePost'

function ProfilePosts({ user_id }) {

    const { token } = useAuth()
    const [postsData, setPostsData] = useState([])
    const [isPostEnlarged, setIsPostEnlarged] = useState(true);
    const [enlargedPostId, setEnlargedPostId] = useState(-1);
    const [enlargedPost, setEnlargedPost] = useState(null);

    useEffect(() => {
        const getUserPostsFn = async () => {
            if (!token) return;
            try {
                const res = await getUserPosts(user_id, token);
                console.log("get user posts", res)
                setPostsData(res?.posts || [])

            } catch (error) {
                console.log(error)
            }
        }

        getUserPostsFn();
    }, [])


    const handleEnlargedPost = (post_id: number) => {
        setIsPostEnlarged(false);
        setEnlargedPostId(post_id)

        const selectedPost = postsData.find((post) => post.post_id === post_id);
        if (selectedPost) {
            setEnlargedPost(selectedPost);
        }
    }

    const handleEnlargedPostCancel = () => {
        setIsPostEnlarged(true);
        setEnlargedPostId(-1);
        setEnlargedPost(null);
    }

    return (
        <>
            {/* <div>ProfilePosts {user_id}</div> */}
            <div className='profile-posted-image-wrapper'>
                {
                    (isPostEnlarged) ?
                        postsData.map((post) => (
                            <Post post={post} handleEnlargedPost={handleEnlargedPost} />
                        ))

                        :
                        <div>
                            {postsData.length > 0 && <div className='floating-large-post'> <LargePost handleEnlargedPostCancel={handleEnlargedPostCancel} post={enlargedPost} /> </div>}
                        </div>
                }
            </div>
        </>
    )

}

export default ProfilePosts