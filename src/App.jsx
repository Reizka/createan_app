import { useState, useEffect } from "react"
import { firebaseConfig } from "../firebaseConfig"
import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//PAGES
import Tourism from "./pages/tourism/Tourism";
import RealEstate from "./pages/realEstate/RealEstate";
//import Calendar from "./pages/calendar/Calendar";
//Header
import Navbar from "./components/header/Navbar";
//Footer
import Footer from "./components/footer/Footer";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Modified function to be async and return the  data
async function getData(db, language) {
  const docRef = doc(db, "cretan", language);
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
  const docRef = doc(db, "cretan", "images");
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
  } catch (error) {
    console.error("Error getting document:", error);
    return []; // Return empty array in case of error
  }
}

const App = () => {
  const [pageText, setPageText] = useState([]); // State to store cities
  const [img, setImages] = useState([]);
  const [language, setLanguage] = useState('english');
  useEffect(() => {
    getData(db, language).then(setPageText);
    getImages(db).then(setImages);
  }, [language]); // Empty dependency array means this effect runs once on mount
  console.log("img state", img);



  return (
    <div className="w-screen h-screen bg-white">
      <Router>
        {/*<Navbar /> */}
        <Routes>
          <Route exact path='/' element={<Tourism pageText={pageText} imageRef={img} />} />
          <Route exact path='/realestate' element={<RealEstate pageText={pageText} />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App