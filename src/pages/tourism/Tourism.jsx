import { useState, useEffect } from "react"



const Tourism = (props) =>{
   const {title, text, offerText, images } = props;
    return (
        <div> 
           <h1>{title}</h1>
           <p>{text}</p>
        </div>
    )
}


export default Tourism;
