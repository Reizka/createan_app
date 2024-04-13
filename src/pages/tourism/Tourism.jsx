import { useState, useEffect } from "react"


const Photos = ({ photos_tourism }) => {
    const [photoIndex, setPhotoIndex] = useState(1);

    /**
  * Increments the photo index or resets to the first photo if at the end of the array.
  */
    const goToNextPhoto = () => {
        const isLastPhoto = photoIndex !== photos_tourism.length - 1;
        setPhotoIndex(isLastPhoto ? photoIndex + 1 : 0);
        console.log(photoIndex);
    };

    /**
     * Decrements the photo index or resets to the last photo if at the beginning of the array.
     */
    const goToPreviousPhoto = () => {
        const isFirstPhoto = photoIndex !== 0;
        setPhotoIndex(isFirstPhoto ? photoIndex - 1 : photos_tourism.length - 1);
        console.log(photoIndex);
    }

    const curPhoto = (photoIndex) => {

    }


    return (
        <>

            <div className="relative">
                <button
                    onClick={() => { goToPreviousPhoto() }}
                    className="
                    absolute top-1/2 left-0 transform -translate-y-1/2  
                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
                    Back
                </button>
                <button
                    onClick={() => { goToNextPhoto() }}
                    className="
                    absolute top-1/2 right-0 transform -translate-y-1/2
                    bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-2">
                    Next
                </button>
                <div>
                    {photos_tourism && (
                        <div className="w-96 h-96 bg-black flex items-center justify-center rounded-xl">
                            <img
                                className="max-w-80 max-h-80 m-auto"
                                src={photos_tourism[photoIndex]}
                                alt="current fullsized photo"
                            />
                        </div>

                    )
                    }
                </div>
            </div>

            <div className="flex flex-row">
                {photos_tourism && photos_tourism.map((photo, index) => {
                    {
                        return photo ? (
                            <div key={index} className="p-2 bg-white">
                                <img
                                    className="h-20 w-20 m-auto"
                                    src={photo}
                                    alt="Location"
                                />

                            </div>
                        ) : null;
                    }
                })
                }
            </div>
        </>
    )
}


const Tourism = ({ pageText, imageRef }) => {
    const { title, text, offerText } = pageText;
    const { photos_tourism } = imageRef;
    console.log(photos_tourism);
    return (
        <div className="flex flex-col">
            <div className="bg-white mt-20 m-8 p-4 rounded-xl">
                <h1 className="justified text-center underline text-2xl">{title}</h1>
                <p>{text}</p>
            </div>
            <div className="m-auto">
                <Photos photos_tourism={photos_tourism} />
            </div>
        </div>
    )
}


export default Tourism;
