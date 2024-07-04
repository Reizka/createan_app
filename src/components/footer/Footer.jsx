import React from 'react';

const Footer = ({ addressData }) => {
    const { city, postcode, state, street, country } = addressData;
    const mapQuery = `${street}, ${city}, ${state}, ${postcode}, ${country}`;

    return (
        <div className="fixed bottom-0 w-full bg-black text-white p-4">
            <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                    <p>{street}</p>
                    <p>{city}, {state} {postcode}</p>
                    <p>{country}</p>
                </div>
                <div>
                    <iframe
                        title="Google Maps"
                        width="150"
                        height="150"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(mapQuery)}`}
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}

export default Footer;
