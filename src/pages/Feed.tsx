import React, { use, useEffect, useState } from 'react'
import "./Feed.css"
import Post from '../components/Post'
import { getAllPosts } from '../services/post'
import LargePost from '../components/LargePost'
import CreatePost from '../components/CreatePost'
import useAuthToken from '../hooks/useAuthToken'
import { useAuth } from '../context/userContext'


function Feed() {

    const [postsData, setPostsData] = useState([])
    const [isPostEnlarged, setIsPostEnlarged] = useState(true);
    const [enlargedPostId, setEnlargedPostId] = useState(-1);
    const [enlargedPost, setEnlargedPost] = useState(null);
    const { token } = useAuth();

    console.log("userTOken  FEED", token)

    useEffect(() => {
        const getAllPostsFn = async () => {

            if (!token) return;
            try {
                const res = await getAllPosts(token);
                console.log("API call", res.posts)
                setPostsData(res.posts)
            }
            catch (error) {
                console.log(error)
            }
        }

        getAllPostsFn()
    }, [token])

    const handleEnlargedPost = (post_id: number) => {
        setIsPostEnlarged(false);
        setEnlargedPostId(post_id)

        const selectedPost = postsData.find((post) => post.post_id === post_id);
        if (selectedPost) {
            setEnlargedPost(selectedPost);
        }
    }


    return (
        <div className='feed-container'>

            <div className='leftbar'>Leftbar</div>
            <div className='rightbar'>


                {
                    (isPostEnlarged) ?
                        <div>
                            <CreatePost />
                            <div className="post-wrapper">
                                {
                                    postsData.map((post) => (
                                        <Post post={post} handleEnlargedPost={handleEnlargedPost} />
                                    ))
                                }
                            </div>
                        </div>

                        :
                        <div>
                            {postsData.length > 0 && <LargePost post={enlargedPost} />}
                        </div>
                }

            </div>
        </div>
    )
}

export default Feed