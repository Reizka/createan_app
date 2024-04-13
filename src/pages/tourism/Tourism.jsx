import { useState, useEffect } from "react"



const Tourism = ({ pageText, imageRef }) => {
    const { title, text, offerText } = pageText;
    const { photos_tourism } = imageRef;

    return (
        <div className="flex flex-col">
            <div className="bg-white mt-20 m-8 p-4 rounded-xl">
                <h1 className="justified text-center underline text-2xl">{title}</h1>
                <p>{text}</p>
            </div>
            <div className="m-auto">
                {
                    photos_tourism.map((photo) => {
                        if (photo != null || photo != "") {
                            console.log(photo, "photo")
                            return (
                                <div>
                                    <img
                                        className="h-8 w-20 h-20"
                                        src={photo}
                                        alt="photo of the location"
                                    />
                                </div>
                            )
                        }
                    })

                }
            </div>
        </div>
    )
}


export default Tourism;
