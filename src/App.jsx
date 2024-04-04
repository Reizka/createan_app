
import { useState, useEffect } from "react"
import { firebaseConfig} from "../firebaseConfig"
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

// Modified getCities function to be async and return the cities data
async function getCities(db) {
  const docRef = doc(db, "cretan", "english");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return []; // Return empty array if document does not exist
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return []; // Return empty array in case of error
  }
}

async function getImages(db) {
  const docRef = doc(db,"cretan", "images");
  try {
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return []; // Return empty array in case of error
  }
}

const App = () => {
  const [lang, setLanguage] = useState([]); // State to store cities
  const [img,setImages] = useState([]);
  useEffect(() => {
    getCities(db).then(setLanguage);
    getImages(db).then(setImages);
  }, []); // Empty dependency array means this effect runs once on mount
  //console.log(cities);

  console.log(img);

  return (
    <div>
      <h1>Welcome</h1>
      <p>site in progress...</p>
        {lang.title}
        {lang.text}
        {lang.offerText}
        <img src={img.logo} alt="Logo for the website"/>
    </div>
  )
}

export default App