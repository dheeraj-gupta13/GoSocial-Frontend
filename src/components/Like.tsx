import React, { useEffect, useState } from 'react'
import { getReactionType, likeApi, unLikeApi } from '../services/like';
import { useAuth } from '../context/userContext';
// import { REACTIONS } from '../constants/reactions';
import './Like.css';


export const REACTIONS = [
    { id: 1, name: "Like", emoji: "👍", color: "#14B8A6" },
    { id: 2, name: "Love", emoji: "❤️", color: "#ef4444" },
    { id: 3, name: "Haha", emoji: "😂", color: "#facc15" },
    { id: 4, name: "Wow", emoji: "😮", color: "#3b82f6" },
    { id: 5, name: "Sad", emoji: "😢", color: "#6366f1" },
    { id: 6, name: "Angry", emoji: "😡", color: "#dc2626" },
];

function Like({ post }) {
    const [reactionId, setReactionId] = useState<number | null>(null);
    const [reactionCounts, setReactionCounts] = useState<Record<number, number>>({});
    const [showReactions, setShowReactions] = useState(false);
    const { token } = useAuth();

    const handleReaction = async (id: number) => {
        try {
            if (reactionId === id) {
                // already same reaction → unlike
                await unLikeApi(post.post_id, token);
                setReactionId(-1);
                setReactionCounts(prev => ({
                    ...prev,
                    [id]: Math.max((prev[id] || 1) - 1, 0)
                }));
            } else {
                await likeApi({ post_id: post.post_id, reaction_type: id }, token);
                setReactionId(id);
                setReactionCounts(prev => ({
                    ...prev,
                    [id]: (prev[id] || 0) + 1,
                    ...(reactionId && reactionId !== -1
                        ? { [reactionId]: Math.max((prev[reactionId] || 1) - 1, 0) }
                        : {})
                }));
            }
        } catch (error) {
            console.log("error while reacting", error);
        }
        setShowReactions(false);
    };

    useEffect(() => {
        const fetchReaction = async () => {
            try {
                const res = await getReactionType(post.post_id, token);
                setReactionId(res.reaction_type);
                setReactionCounts(res.reaction_counts || {});
            } catch (error) {
                console.log(error);
            }
        };
        fetchReaction();
    }, [post.post_id, token]);

    const currentReaction = REACTIONS.find(r => r.id === reactionId);

    return (
        <div className="like-container">
            {/* Button showing current reaction */}
            <div
                className="like-button"
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
            >
                {currentReaction ? (
                    <span style={{ color: currentReaction.color }}>
                        {currentReaction.emoji} {currentReaction.name}
                    </span>
                ) : (
                    "Like"
                )}

                {/* Reaction popup */}
                {showReactions && (
                    <div className="reaction-popup">
                        {REACTIONS.map(r => (
                            <span
                                key={r.id}
                                className="reaction-emoji"
                                style={{ color: r.color }}
                                onClick={() => handleReaction(r.id)}
                            >
                                {r.emoji}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Reaction counters */}
            {/* <div className="reaction-counts">
                {Object.entries(reactionCounts).map(([id, count]) => {
                    if (count > 0) {
                        const reaction = REACTIONS.find(r => r.id === Number(id));
                        return (
                            <span key={id} className="reaction-count">
                                {reaction?.emoji} {count}
                            </span>
                        );
                    }
                    return null;
                })}
            </div> */}

            {/* Reaction counters */}
            <div className="reaction-counts">
                {Object.entries(reactionCounts)
                    .filter(([_, count]) => count > 0) // only show if >0
                    .slice(0, 3) // show at most 3 different emojis (like Facebook)
                    .map(([id]) => {
                        const reaction = REACTIONS.find(r => r.id === Number(id));
                        return (
                            <span key={id} className="reaction-icon">
                                {reaction?.emoji}
                            </span>
                        );
                    })
                }
                {/* Total count */}
                {Object.values(reactionCounts).reduce((sum, c) => sum + c, 0) > 0 && (
                    <span className="reaction-total">
                        {Object.values(reactionCounts).reduce((sum, c) => sum + c, 0)}
                    </span>
                )}
            </div>

        </div>
    );
}

export default Like;
