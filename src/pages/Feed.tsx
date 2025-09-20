import { useEffect, useState } from 'react'
import "./Feed.css"
import Post from '../components/Post'
import { getAllPosts } from '../services/post'
import LargePost from '../components/LargePost'
import CreatePost from '../components/CreatePost'
import { useAuth } from '../context/userContext'
import Leftbar from '../components/Leftbar'

export interface Reaction {
    what_reacted: number;
    who_reacted: string;
}

export interface PostType {
    post_id: number;
    user_id: number;
    username: string;
    avatar_url: string;
    content: string;
    created_at: string;
    do_I_follow: number;
    image_url: string;
    reaction_array: Reaction[] | null;
}

export interface GetPostsResponse {
    posts: PostType[];
    user_id: number;
    username: string;
}

export interface PostsData {
    posts: PostType[];
    user_id: number;
    username: string;
}

// Generic API Response
export interface ApiError {
    code: string;
    message: string;
    status_code: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    error?: ApiError | null;
}

function Feed() {

    const { token } = useAuth();
    const [postsData, setPostsData] = useState<PostType[]>([])
    const [isPostEnlarged, setIsPostEnlarged] = useState<boolean>(true);
    const [enlargedPostId, setEnlargedPostId] = useState<number>(-1);
    const [enlargedPost, setEnlargedPost] = useState<PostType | null>(null);
    const [mode, setMode] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string>("");


    useEffect(() => {
        const getAllPostsFn = async () => {

            if (!token) return;
            try {
                const res: ApiResponse<PostsData> = await getAllPosts(token);
                console.log("Hiiiiiiiiiii")
                if (res.success && res.data) {
                    console.log("API call", res.data.posts)
                    setPostsData(res.data.posts)
                } else {
                    console.error("API Error:", res.error);
                    setErrorMsg(res.error?.message || "Failed to fetch posts");
                }
            }
            catch (error) {
                console.log(error)
                setErrorMsg("Something went wrong. Please try again later.");
            }
        }

        getAllPostsFn()
    }, [token])


    useEffect(() => {
        const shouldLockScroll = !isPostEnlarged || !mode;
        document.body.style.overflow = shouldLockScroll ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPostEnlarged, mode]);

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
            {
                (!mode) &&

                <div className='floating-create-post'>
                    <CreatePost mode={mode} setMode={setMode} />
                </div>
            }


            {
                (!isPostEnlarged)
                &&
                <div className='floating-large-post'>
                    {postsData.length > 0 && <LargePost post={enlargedPost} handleEnlargedPostCancel={handleEnlargedPostCancel} />}
                </div>
            }

            <div className={`feed-container ${(mode && isPostEnlarged) ? '' : 'blurred'} `}>

                {/* <div className='leftbar'>
                    <ul>
                        <li>Feed</li>
                    </ul>
                </div> */}
                {/* <Leftbar /> */}
                <div className='rightbar'>
                    {

                        <div>
                            {
                                (mode) &&
                                <CreatePost mode={mode} setMode={setMode} />
                            }

                            <div className="post-wrapper">
                                {
                                    postsData.map((post) => (
                                        <Post key={post.post_id} post={post} handleEnlargedPost={handleEnlargedPost} />
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Feed