import { useEffect, useState } from 'react'
import { followApi, unFollowApi } from '../services/profile';
import { useAuth } from '../context/userContext';


interface FollowProps {
    doIFollow: number;  // -1 = N/A, 0 = not following, 1+ = following
    user_id: number;
    profile?: boolean
}

function Follow({ doIFollow, user_id, profile }: FollowProps) {

    console.log("follow doIFollow", doIFollow)
    const [follow, setFollow] = useState(doIFollow)
    const { token } = useAuth();

    useEffect(() => {
        setFollow(doIFollow);
    }, [doIFollow]); // run this effect whenever doIFollow changes

    const handleClick = async () => {
        try {

            if (follow >= 1) {
                const res = await unFollowApi(user_id, token);
                console.log("RES", res)
                if (res.status === 200 || res.message === "User unfollowed successfully") {
                    console.log("setFollow(0)")
                    setFollow(0);
                }
            }
            else {
                const res = await followApi(user_id, token);
                if (res.status === 200 || res.message === "user followed successfully") {
                    console.log("setFollow(1)")
                    setFollow(1)
                }
            }

        } catch (error) {
            console.log(error);
        }
    }


    console.log("follow ", follow)
    return (
        <div onClick={handleClick}>{(follow >= 1) ? <p className={`${profile ? "user-following-btn" : "post-follow-btn"}`}>Following</p> : <p className={`${profile ? "user-follow-btn" : "post-follow-btn"}`}>Follow</p>}</div>
    )
}

export default Follow