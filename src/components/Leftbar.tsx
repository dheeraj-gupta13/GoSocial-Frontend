import React, { useState } from 'react'
import './Leftbar.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/userContext'


function Leftbar() {
    const [activeTab, setActiveTab] = useState('Feed') // default active tab
    const navigate = useNavigate();
    const { logout } = useAuth()

    const handleFeed = (tab: string) => {
        setActiveTab(tab);
        navigate('/');
    }

    const handleMessage = (tab: string) => {
        setActiveTab(tab);
        navigate('/messages');
    }

    const handleNotifications = (tab: string) => {
        setActiveTab(tab);
        navigate('/notifications');
    }

    const handleProfile = (tab: string) => {
        setActiveTab(tab);
        const username = localStorage.getItem('user')
        navigate(`/profile/${username}`);
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const menu = [
        { tab: 'Feed', action: handleFeed },
        { tab: 'Message', action: handleMessage },
        { tab: 'Notifications', action: handleNotifications },
        { tab: 'Profile', action: handleProfile },
    ];

    return (
        <div className='leftbar'>
            {/* Logo */}
            <div className="logo">
                Go<span>Social</span>
            </div>

            {/* Menu */}
            <ul className="menu">
                {menu.map((item) => (
                    <li
                        key={item.tab}
                        className={activeTab === item.tab ? 'active' : ''}
                        onClick={() => item.action(item.tab)}
                    >
                        {item.tab}
                    </li>
                ))}
            </ul>

            {/* Logout Button */}
            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default Leftbar
