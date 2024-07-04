import React, { useState } from 'react';
import { getFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const ImageManager = ({ images, setImages }) => {
    const [newImage, setNewImage] = useState(null);
    const db = getFirestore();
    const storage = getStorage();

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${uuidv4()}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            const updatedImages = { ...images, photos_tourism: [...(images.photos_tourism || []), downloadURL] };
            await updateDoc(doc(db, "cretan", "images"), updatedImages);
            setImages(updatedImages);
        }
    };

    const deleteImage = async (url) => {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
        const updatedImages = {
            ...images,
            photos_tourism: images.photos_tourism.filter((imageUrl) => imageUrl !== url)
        };
        await updateDoc(doc(db, "cretan", "images"), updatedImages);
        setImages(updatedImages);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Image Management</h2>
            <input type="file" onChange={handleImageUpload} className="mb-4" />
            <div className="grid grid-cols-2 gap-4">
                {images.photos_tourism && images.photos_tourism.map((url, index) => (
                    <div key={index} className="border p-2 rounded">
                        <img src={url} alt={`image-${index}`} className="w-full h-32 object-cover mb-2" />
                        <button
                            onClick={() => deleteImage(url)}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageManager;
