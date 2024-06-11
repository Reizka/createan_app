import { useState, useEffect } from "react"

import PhotoCarousel from "./Tourism"



const Tourism = ({ pageText, imageRef }) => {
    const { title, text, offerText } = pageText;
    const { photos_tourism } = imageRef;
    console.log(photos_tourism);
    return (


        <PhotoCarousel images={photos_tourism} />

    )
}


export default Tourism;
