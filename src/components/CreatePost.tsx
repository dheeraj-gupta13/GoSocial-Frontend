import React, { useState } from 'react'
import { createPostApi } from '../services/post';
import { useAuth } from '../context/userContext';


function CreatePost() {
    const [file, setFile] = useState<File | null>(null);
    const [content, setContent] = useState("");
    const { token } = useAuth();
    // const [imageUrl, setImageUrl] = useState("");

    const handleUpload = async () => {
        if (!file || !content.trim()) {
            alert("Both image and content are required");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);
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

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Upload Image with Content</h2>

            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <textarea
                className="block mt-2 p-2 border rounded w-full"

                placeholder="Enter content/description here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleUpload}
            >
                Upload
            </button>

            {/* {imageUrl && (
                <div className="mt-4">
                    <p>Uploaded Image:</p>
                    <img src={imageUrl} alt="Uploaded" width={200} />
                    <p className="mt-2"><strong>Content:</strong> {content}</p>
                </div>
            )} */}
        </div>

    )
}

export default CreatePost