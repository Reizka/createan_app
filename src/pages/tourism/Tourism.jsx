import { useState, useEffect } from "react"



const Tourism = ({ pageText }) => {
    const { title, text, offerText, images } = pageText;
    return (
        <div>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    )
}


export default Tourism;
