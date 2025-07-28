import React, { useEffect, useState } from 'react'
import { getReactionType } from '../services/like';
import { useAuth } from '../context/userContext';
import { likeApi, unLikeApi } from '../services/like';


function Like(prop) {

    console.log("I am into likes", prop);
    const [reactionId, setReactionId] = useState<number | null>(null);
    const { token } = useAuth();

    const handleLike = async () => {
        if (!reactionId || reactionId == -1) {
            try {
                const res = await likeApi({
                    post_id: prop.post.post_id,
                    reaction_type: 1
                }, token);
                console.log("likeApi", res);
                setReactionId(1); // manually update

            } catch (error) {
                console.log("error while like", error)
            }
        }
        else {
            try {
                const res = await unLikeApi(prop.post.post_id, token);
                console.log("likeApi", res);
                setReactionId(-1); // manually update
            } catch (error) {
                console.log("error while unlike", error)
            }
        }
    }

    useEffect(() => {

        const getReactionTypeUtil = async () => {
            try {
                const res = await getReactionType(prop.post.post_id, token);
                console.log("res.reaction_type", res.reaction_type)
                setReactionId(res.reaction_type)
            } catch (error) {
                console.log(error)
            }
        }

        getReactionTypeUtil()
    }, [reactionId])



    return (
        <div>
            <div onClick={handleLike}>
                {reactionId == -1 ? <div>Like</div> : <div>Liked</div>}
            </div>
        </div>
    )
}

export default Like