import React from 'react';
import { getFirestore, doc, updateDoc } from 'firebase/firestore/lite';

const AddressManager = ({ addressData, setAddressData }) => {
    const db = getFirestore();

    const updateAddressData = async (field, newValue) => {
        const docRef = doc(db, "cretan", "address");
        const updatedData = { ...addressData, [field]: newValue };
        await updateDoc(docRef, updatedData);
        setAddressData(updatedData);
    };

    return (
        <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Address Management</h3>
            {Object.keys(addressData).map((field) => (
                <div key={field} className="mb-2">
                    <label className="block mb-1 capitalize">{field}:</label>
                    <input
                        className="w-full p-2 border rounded mb-2"
                        value={addressData[field] || ''}
                        onChange={(e) => updateAddressData(field, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};

export default AddressManager;
