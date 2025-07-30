import React, { useEffect, useState } from 'react'
import './Profile.css'
import { profileApi } from '../services/profile'
import { useAuth } from '../context/userContext'


function Profile() {

    const { token } = useAuth();
    const [profile, setProfile] = useState({});
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {

        const fetchUserProfile = async () => {
            try {
                const res = await profileApi(2, token);
                console.log(res);
                setProfile(res.profile)
                setFollowers(res.profile.followers ?? []);
                setFollowing(res.profile.followings ?? []);
                console.log("floowing", following)
            } catch (error) {
                console.log("error", error)
            }
        }

        fetchUserProfile();
    }, [])

    return (
        <div className='profile-container'>
            <div className='profile-leftbar'>Leftbar</div>
            <div className='profile-rightbar'>
                <div className='display-picture'>
                    {/* Display picture */}
                </div>


                <div className='profile-top'>
                    <div className='profile-info'>
                        <div className='profile-pic-wrap'>
                            <img className='profile-pic' src="https://picsum.photos/200/300" alt="display picture" />
                        </div>
                        <div className='profile-wrapper'>
                            <div className='display-name-wrap'>
                                <p className='display-name'>{profile.username}</p>
                                <p className='is-verified'>S</p>
                            </div>
                            <p className='bio'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt labore minima aperiam? </p>
                            <div className='profile-buttons'>
                                <div>Follow</div>
                                <div>Get in Touch</div>
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
            </div>
        </div>
    )
}

export default Profile