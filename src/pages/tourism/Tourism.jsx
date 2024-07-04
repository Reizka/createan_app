import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './styles.css';
import Footer from "../../components/footer/Footer";
import videoBG from "../../../utility/cretan.mp4";

const Tourism = ({ pageText, imageRef, address, language, onLanguageChange }) => {
    const { title, text, offerText } = pageText;
    const { photos_tourism } = imageRef;
    const [carouselItems, setItems] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);

    console.log("images", photos_tourism);

    useEffect(() => {
        if (photos_tourism && photos_tourism.length > 0) {
            const items = photos_tourism.map((photo, index) => (
                <div key={index} className="flex items-center justify-center h-full w-full shadow-xl">
                    <img
                        src={photo}
                        alt={`Slide ${index + 1}`}
                        className="m-auto object-contain max-h-100 w-auto"
                    />
                </div>
            ));
            setItems(items);
        }
    }, [photos_tourism]);

    // Image carousel size settings
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
            partialVisibilityGutter: 40
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            partialVisibilityGutter: 40
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 90
        },
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [isFooterVisible, setIsFooterVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY === 0) {
            setIsFooterVisible(false);
        } else {
            setIsFooterVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const languageFlags = {
        english: "🇬🇧",
        german: "🇩🇪",
        greek: "🇬🇷"
    };

    return (
        <div className="relative bg-white">
            {!isVideoReady && (
                <div className="absolute inset-0 flex justify-center items-center bg-white z-10">
                    <p className="text-2xl font-semibold">Loading...</p>
                </div>
            )}
            <section id="section1" className="relative h-screen flex flex-col justify-center items-center bg-blue-500">
                <div className="absolute top-4 right-4 z-10">
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                                onClick={() => setDropdownVisible(!dropdownVisible)}
                            >
                                <span>{languageFlags[language]}</span>
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                        {dropdownVisible && (
                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                    <button onClick={() => { onLanguageChange('english'); setDropdownVisible(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <span role="img" aria-label="English">🇬🇧</span> English
                                    </button>
                                    <button onClick={() => { onLanguageChange('german'); setDropdownVisible(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <span role="img" aria-label="German">🇩🇪</span> German
                                    </button>
                                    <button onClick={() => { onLanguageChange('greek'); setDropdownVisible(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <span role="img" aria-label="Greek">🇬🇷</span> Greek
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="absolute transform -translate-y-1/2 z-[1]">
                    <img
                        className="m-auto w-auto sm:h-80 md:h-96 lg:h-[300px] xl:h-[300px] 2xl:h-[300px]"
                        src="https://firebasestorage.googleapis.com/v0/b/cretanapp.appspot.com/o/logo.svg?alt=media&token=c83a13ba-3f63-41c0-b32d-7e3b2cf0781a"
                        alt="The Cretan Company logo"
                    />
                </div>

                <button onClick={() => scrollToSection('section2')} className="absolute bottom-20 p-2 bg-white text-blue-500 rounded z-[1] md:bottom-4">
                    More
                </button>

                <div className="absolute top-0 left-0 w-full h-full">
                    <video
                        className="h-screen w-full object-cover"
                        src={videoBG}
                        autoPlay
                        loop
                        muted
                        onCanPlay={() => setIsVideoReady(true)}
                    />
                </div>
            </section>

            <section id='section2' className='mt-40 h-screen'>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="mt-2 m-auto lg:h-[600px] h-[350px] w-auto"
                    containerClass="container-with-dots"
                    dotListClass=""
                    itemClass="h-full"
                    draggable
                    focusOnSelect={false}
                    infinite
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responsive}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {carouselItems}
                </Carousel>

                <div className="m-2 p-4 shadow-lg rounded-lg">
                    {text}
                </div>

                {isFooterVisible && <Footer addressData={address} />}
            </section>
            {
                /*
                <div className="p-4">
                  <p>{text}</p>
                </div>*/
            }
        </div>
    );
};

export default Tourism;
