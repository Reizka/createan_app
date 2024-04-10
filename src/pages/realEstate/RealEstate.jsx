import { useState, useEffect } from "react"



const RealEstate = ({ pageText }) => {

    const { re_text, re_title, images } = pageText;
    return (
        <div>
            <h1>{re_title}</h1>
            <p>{re_text}</p>
        </div>
    )
}


export default RealEstate;