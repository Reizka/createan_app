import React, { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


const Admin = ({ auth, signInWithEmailAndPassword }) => {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [languageData, setLanguageData] = useState({});
    const [addressData, setAddressData] = useState({});
    const [images, setImages] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [showResetModal, setShowResetModal] = useState(false);
    const [resetMessage, setResetMessage] = useState('');
    const db = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                fetchData();
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const fetchData = async () => {
        const languages = ['english', 'german', 'greek'];
        const languagePromises = languages.map(lang => getDoc(doc(db, "cretan", lang)));
        const addressPromise = getDoc(doc(db, "cretan", "address"));
        const imagesPromise = getDoc(doc(db, "cretan", "images"));

        const languageDocs = await Promise.all(languagePromises);
        const addressDoc = await addressPromise;
        const imagesDoc = await imagesPromise;

        const languageData = {};
        languageDocs.forEach((doc, index) => {
            if (doc.exists()) {
                languageData[languages[index]] = doc.data();
            }
        });

        setLanguageData(languageData);
        setAddressData(addressDoc.exists() ? addressDoc.data() : {});
        setImages(imagesDoc.exists() ? imagesDoc.data() : {});
    };

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                setResetMessage('');
            })
            .catch((error) => {
                setError("Signing Error: " + error.message);
            });
    };

    const signOut = () => {
        auth.signOut();
    };

    const resetPassword = () => {
        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    setResetMessage('Password reset email sent.');
                })
                .catch((error) => {
                    setError("Error sending reset email: " + error.message);
                });
        } else {
            setError('Please enter your email to reset password.');
        }
        setShowResetModal(false);
    };

    const updateLanguageData = async (language, field, newValue) => {
        const docRef = doc(db, "cretan", language);
        const updatedData = { ...languageData[language], [field]: newValue };
        await updateDoc(docRef, updatedData);
        setLanguageData({ ...languageData, [language]: updatedData });
    };

    const updateAddressData = async (field, newValue) => {
        const docRef = doc(db, "cretan", "address");
        const updatedData = { ...addressData, [field]: newValue };
        await updateDoc(docRef, updatedData);
        setAddressData(updatedData);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `images/${uuidv4()}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            const updatedImages = { ...images, photos_tourism: [...images.photos_tourism, downloadURL] };
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
        <div className="p-4">
            {user ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                    <div className="flex items-center mb-4">
                        <button onClick={signOut} className="mr-2 px-4 py-2 bg-red-500 text-white rounded">Sign Out</button>
                        <button onClick={() => setShowResetModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded">Reset Password</button>
                    </div>
                    {resetMessage && <p className="text-green-500 mb-4">{resetMessage}</p>}
                    <div className="mb-4">
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="english">English</option>
                            <option value="german">German</option>
                            <option value="greek">Greek</option>
                            <option value="address">Address</option>
                            <option value="images">Images</option>
                        </select>
                    </div>

                    {selectedLanguage === 'english' && (
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">English</h3>
                            {['offerText', 'text', 'title'].map((field) => (
                                <div key={field} className="mb-2">
                                    <label className="block mb-1 capitalize">{field}:</label>
                                    <textarea
                                        className="w-full p-2 border rounded mb-2"
                                        value={languageData.english?.[field] || ''}
                                        onChange={(e) =>
                                            updateLanguageData('english', field, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedLanguage === 'german' && (
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">German</h3>
                            {['offerText', 'text', 'title'].map((field) => (
                                <div key={field} className="mb-2">
                                    <label className="block mb-1 capitalize">{field}:</label>
                                    <textarea
                                        className="w-full p-2 border rounded mb-2"
                                        value={languageData.german?.[field] || ''}
                                        onChange={(e) =>
                                            updateLanguageData('german', field, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedLanguage === 'greek' && (
                        <div className="mb-4">
                            <h3 className="text-xl font-bold mb-2">Greek</h3>
                            {['offerText', 'text', 'title'].map((field) => (
                                <div key={field} className="mb-2">
                                    <label className="block mb-1 capitalize">{field}:</label>
                                    <textarea
                                        className="w-full p-2 border rounded mb-2"
                                        value={languageData.greek?.[field] || ''}
                                        onChange={(e) =>
                                            updateLanguageData('greek', field, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedLanguage === 'address' && (
                        <div className="mb-4">
                            <h2 className="text-xl font-bold mb-2">Address Management</h2>
                            {Object.keys(addressData).map((field) => (
                                <div key={field} className="mb-2">
                                    <label className="block mb-1 capitalize">{field}:</label>
                                    <input
                                        className="w-full p-2 border rounded mb-2"
                                        value={addressData[field]}
                                        onChange={(e) =>
                                            updateAddressData(field, e.target.value)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedLanguage === 'images' && (
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
                    )}
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                    <form onSubmit={signIn} className="space-y-4">
                        <div>
                            <label className="block mb-1">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Sign In</button>
                    </form>
                    <button onClick={() => setShowResetModal(true)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Reset Password</button>
                    {resetMessage && <p className="text-green-500 mt-2">{resetMessage}</p>}
                    {error && <p className="mt-2 text-red-500">{error}</p>}
                </div>
            )}

            {showResetModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                        <p className="mb-4">Do you want to send a password reset email to {email}?</p>
                        <div className="flex justify-end">
                            <button onClick={() => setShowResetModal(false)} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded">Cancel</button>
                            <button onClick={resetPassword} className="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
