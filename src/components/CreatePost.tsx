import React, { useState, useRef } from 'react'
import type { ChangeEvent } from 'react';
import { createPostApi } from '../services/post';
import { useAuth } from '../context/userContext';
import { TiCamera } from "react-icons/ti";
import imageCompression from 'browser-image-compression';
import { RxCross1 } from "react-icons/rx";


interface CreatePostProps {
    mode: boolean;
    setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePost({ mode, setMode }: CreatePostProps) {
    const [file, setFile] = useState<File | null>(null);
    const [content, setContent] = useState("");
    const { token } = useAuth();
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const handleUpload = async () => {
        if (!file || !content.trim()) {
            alert("Both image and content are required");
            return;
        }

        const options = {
            maxSizeMB: 1,                 // Target max size in MB
            maxWidthOrHeight: 1920,       // Resize if larger
            useWebWorker: true,           // Use worker for faster compression
        };
        const compressedFile = await imageCompression(file, options);
        console.log("Original size:", file.size, "Compressed size:", compressedFile.size);

        const formData = new FormData();
        formData.append("image", compressedFile);
        console.log("file size", file.size)
        formData.append("content", content);
        console.log("----->", formData)
        console.log("----->", content)
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }



        try {
            console.log("CREATE POST API", token)
            const data = await createPostApi(formData, token)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };



    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        console.log("file size", selectedFile.size)

        if (selectedFile.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setPreview(null);
        }
    };


    const handleFocus = () => {
        console.log("user wants to upload posts")
        setMode(false)
    }

    const handleCameraClick = () => {
        fileInputRef.current?.click(); // Trigger file input click
    }

    return (


        <>
            {
                (mode) ?

                    <div className="create-post">
                        <div className='create-post-container'>
                            <input
                                className="create-post-input"
                                type='text'

                                placeholder="What's happening...."
                                value={content}
                                onFocus={handleFocus}
                            />

                            <TiCamera onClick={handleFocus} className='camera' />
                        </div>
                    </div>

                    :

                    <div className='create-post-container-2'>
                        <div className='create-post-header'>
                            <p>Create Post</p>
                            <p onClick={() => { setMode(true) }} > <RxCross1 /> </p>
                        </div>
                        <textarea
                            className="create-post-input-2"
                            placeholder="What's happening...."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />

                        <TiCamera onClick={handleCameraClick} className='camera-2' />
                        <input ref={fileInputRef} style={{ display: 'none' }} type="file" onChange={handleFileChange} />

                        {
                            (preview)
                            &&
                            <img src={preview} alt="Preview" className="post-preview-image" />
                        }


                        <button
                            className="post-upload-button"
                            onClick={handleUpload}
                        >
                            Post
                        </button>
                    </div>


            }


        </>

    )
}

export default CreatePost