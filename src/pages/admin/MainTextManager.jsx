import React from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore/lite';

const MainTextManager = ({ language, languageData, setLanguageData }) => {
    const db = getFirestore();

    const updateLanguageData = async (field, newValue) => {
        const docRef = doc(db, "cretan", language);
        const updatedData = { ...languageData, [field]: newValue };
        await updateDoc(docRef, updatedData);
        setLanguageData(updatedData);
    };

    return (
        <div className="mb-4">
            <h3 className="text-xl font-bold mb-2 capitalize">{language}</h3>
            {['offerText', 'text', 'title'].map((field) => (
                <div key={field} className="mb-2">
                    <label className="block mb-1 capitalize">{field}:</label>
                    <textarea
                        className="w-full p-2 border rounded mb-2"
                        value={languageData[field] || ''}
                        onChange={(e) => updateLanguageData(field, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};

export default MainTextManager;
