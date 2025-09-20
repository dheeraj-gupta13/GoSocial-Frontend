import React, { useState, useRef } from "react"
import "./EditProfile.css"
import { LuPencil } from "react-icons/lu"
import { FaTrash } from "react-icons/fa"
import imageCompression from "browser-image-compression"
import { updateProfileApi } from "../services/profile"
import { useAuth } from '../context/userContext'
import { RxCross1 } from "react-icons/rx";

interface Profile {
    username: string
    biodata: string
    background_url: string
    avatar_url?: string
}

interface EditProfileProps {
    profile: Profile;
    setIsEditEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

// interface ApiResponse {
//     success: boolean;
//     message?: string;
//     data?: any;
// }

const IMAGE_COMPRESSION_OPTIONS = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
}

function EditProfile({ profile, setIsEditEnabled }: EditProfileProps) {
    const { token } = useAuth();
    const [newBio, setNewBio] = useState<string>(profile.biodata)

    const [backgroundFile, setBackgroundFile] = useState<File | null>(null)
    const [profileFile, setProfileFile] = useState<File | null>(null)

    const [backgroundUrl, setBackgroundUrl] = useState<string>(profile.background_url)
    const [profileUrl, setProfileUrl] = useState<string>(
        profile.avatar_url || "https://picsum.photos/200/300"
    )
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const fileInputBackgroundRef = useRef<HTMLInputElement>(null)
    const fileInputProfileRef = useRef<HTMLInputElement>(null)

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewBio(e.target.value)
    }

    const handleEditSubmit = async () => {

        // disable the save changes button and show the loader instead of save changes text...
        setIsUpdating(true);
        console.log("Final Bio:", newBio)
        console.log("Profile Pic:", profileFile)
        console.log("Background Pic:", backgroundFile)

        const formData = new FormData();
        if (profileFile) formData.append("profile_pic", profileFile);
        if (backgroundFile) formData.append("background_pic", backgroundFile);
        formData.append("username", profile.username);
        formData.append("biodata", newBio);


        try {
            const res = await updateProfileApi(formData, token);
            console.log("res edit profile", res);

        } catch (error) {
            console.log("err 3", error)
        } finally {
            setIsUpdating(false);
        }

        setIsEditEnabled(false);
        location.reload();
    }

    // Upload & compress
    const handleFileUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        type: "background" | "profile"
    ) => {
        const file = e.target.files?.[0]
        if (!file) return



        try {
            const compressedFile = await imageCompression(file, IMAGE_COMPRESSION_OPTIONS)
            const url = URL.createObjectURL(compressedFile)

            if (type === "background") {
                setBackgroundFile(compressedFile)
                setBackgroundUrl(url)
            } else {
                setProfileFile(compressedFile)
                setProfileUrl(url)
            }
        } catch (err) {
            console.error("Image compression failed:", err)
        }
    }



    const handleClearBackground = () => {
        setBackgroundUrl("");
        setBackgroundFile(null);
    };

    const handleClearProfilePic = () => {
        setProfileUrl("");
        setProfileFile(null);
    };


    return (
        <div className="edit-profile">

            <div className="edit-profile-header">
                <p className="edit-title">Edit Profile</p>
                <div className="edit-cross" onClick={() => setIsEditEnabled(false)} ><RxCross1 /> </div>
            </div>

            {/* Background banner */}
            <div className="edit-banner">
                {backgroundUrl ? (
                    <img
                        className="edit-display-picture"
                        src={backgroundUrl}
                        alt="background"
                    />
                ) : (
                    <div className="placeholder-banner">No background image</div>
                )}

                <div className="icon-group">
                    <button
                        className="edit-icon-btn"
                        onClick={() => fileInputBackgroundRef.current?.click()}
                    >
                        <LuPencil size={16} />
                    </button>
                    <button className="edit-icon-btn" onClick={handleClearBackground}>
                        <FaTrash size={16} />
                    </button>
                </div>
                <input
                    ref={fileInputBackgroundRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => handleFileUpload(e, "background")}
                />
            </div>

            {/* Profile + form */}
            <div className="edit-container">
                <div className="edit-left">
                    <div className="profile-pic-wrapper">
                        {profileUrl ? (
                            <img className="edit-profile-pic" src={profileUrl} alt="profile" />
                        ) : (
                            <div className="placeholder-pic">No Profile</div>
                        )}

                        <div className="icon-group profile-icons">
                            <button
                                className="edit-icon-btn"
                                onClick={() => fileInputProfileRef.current?.click()}
                            >
                                <LuPencil size={16} />
                            </button>
                            <button className="edit-icon-btn" onClick={handleClearProfilePic}>
                                <FaTrash size={16} />
                            </button>
                        </div>
                        <input
                            ref={fileInputProfileRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleFileUpload(e, "profile")}
                        />
                    </div>
                </div>

                <div className="edit-right">
                    <label>Username</label>
                    <input type="text" value={profile.username} readOnly />

                    <label>Bio</label>
                    <textarea
                        value={newBio}
                        onChange={handleBioChange}
                        placeholder="Write something about yourself..."
                    />
                </div>
            </div>

            <button className="edit-submit" onClick={handleEditSubmit} disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
            </button>
        </div>
    )
}

export default EditProfile
