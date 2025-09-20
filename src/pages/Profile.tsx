import React, { useEffect, useState } from 'react'
import './Profile.css'
import { profileApi } from '../services/profile'
import { useAuth } from '../context/userContext'
import Edit from '../components/Edit'
import Follow from '../components/Follow'
import ProfilePosts from '../components/ProfilePosts'
import EditProfile from '../components/EditProfile'
import { useParams } from 'react-router-dom';
import Leftbar from '../components/Leftbar'


export interface UserMini {
    user_id: number;
    username: string;
}

export interface Profile {
    profile_id: number;
    user_id: number;
    avatar_url: string;
    background_url: string;
    biodata: string;
    created_on: string;
    username: string;
    followers?: UserMini[];   // optional (omitempty in Go)
    followings?: UserMini[];  // optional (omitempty in Go)
    do_I_follow: number;      // -1 = self, 0 = not following, 1 = following
}

function Profile() {

    const { token } = useAuth();
    const { username } = useParams();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [doIFollow, setDoIFollow] = useState(0);
    const [isEditEnabled, setIsEditEnabled] = useState(false);


    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                const res = await profileApi(username!, token);
                console.log("--> profile ", res);

                if (res.success && res.data) {
                    setProfile(res.data.profile)
                    setFollowers(res.data.profile.followers ?? []);
                    setFollowing(res.data.profile.followings ?? []);
                    setDoIFollow(res.data.profile.do_I_follow)
                    console.log("folllowing", following)
                }
            } catch (error) {
                console.log("error", error)
            }
        }

        fetchUserProfile();
    }, [])


    const handleEdit = () => {
        setIsEditEnabled(true)
        console.log(isEditEnabled)
    }

    return (

        <>
            {

                (!profile) ?
                    <div>Loading</div>
                    :
                    (!isEditEnabled)
                        ?
                        <div className='profile-container'>
                            {/* <div className='profile-leftbar'>Leftbar</div> */}
                            {/* <Leftbar /> */}
                            <div className='profile-rightbar'>
                                {/* <p>{username}</p> */}
                                <div >
                                    {/* Display picture */}
                                    <img className='display-picture' src={profile.background_url} alt="display picture" />
                                </div>


                                <div className='profile-top'>
                                    <div className='profile-info'>
                                        <div className='profile-pic-wrap'>
                                            <img className='profile-pic' src={profile.avatar_url} alt="display picture" />
                                        </div>
                                        <div className='profile-wrapper'>
                                            <div className='display-name-wrap'>
                                                <p className='display-name'>{profile.username}</p>
                                                {/* <p className='is-verified verified-badge'>S</p> */}
                                                {/* <span className="verified-badge" aria-label="Verified" title="Verified"></span> */}
                                                {/* <span className="verified-badge sm" aria-label="Verified"></span> */}
                                                <span className="ig-verified" aria-label="Verified" title="Verified"></span>
                                            </div>
                                            <p className='bio'> {profile.biodata} </p>
                                            <div className='profile-buttons'>
                                                <div>{(doIFollow == -1) ? <Edit handleEdit={handleEdit} /> : <Follow doIFollow={doIFollow} user_id={profile.user_id} profile={true} />}</div>
                                                {/* <div>Get in Touch</div> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='follow-info'>
                                        <div>
                                            <p className='follow-label'>Followers</p>
                                            <p className='follow-value'>{followers.length}</p>
                                        </div>
                                        <div>
                                            <p className='follow-label'>Following</p>
                                            <p className='follow-value'>{following.length}</p>
                                        </div>
                                        <div>
                                            <p className='follow-label'>Likes</p>
                                            <p className='follow-value'>548</p>
                                        </div>
                                    </div>
                                </div>

                                {
                                    (profile.user_id) &&
                                    <ProfilePosts user_id={profile.user_id} />
                                }

                            </div>
                        </div>
                        :
                        <div className='floating-large-post'>
                            <EditProfile setIsEditEnabled={setIsEditEnabled} profile={profile} />
                        </div>
            }
        </>
    )
}

export default Profile