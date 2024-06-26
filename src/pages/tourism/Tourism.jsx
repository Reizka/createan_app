import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './styles.css';

import videoBG from "../../../utility/cretan.mp4"


const Tourism = ({ pageText, imageRef }) => {
    const { title, text, offerText } = pageText;
    const { photos_tourism } = imageRef;
    const [carouselItems, setItems] = useState([]);

    console.log("images", photos_tourism);

    useEffect(() => {
        if (photos_tourism && photos_tourism.length > 0) {
            const items = photos_tourism.map((photo, index) => (
                <div key={index} className="flex items-center justify-center h-full w-full shadow-xl">
                    <img
                        src={photo}
                        alt={`Slide ${index + 1}`}
                        className=" m-auto object-cover max-h-100  w-auto"
                    />
                </div>
            ));
            setItems(items);
        }
    }, [photos_tourism]);

    //Image carousel size settings
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

    return (
        <div className="relative bg-white ">
            <div id='section1 h-screen'>

                <div className='absolute'>
                    <img
                        className="m-auto w-auto sm:h-80 md:h-96 lg:h-[300px] xl:h-[300px] 2xl:h-[300px]"
                        src="https://firebasestorage.googleapis.com/v0/b/cretanapp.appspot.com/o/logo.svg?alt=media&token=c83a13ba-3f63-41c0-b32d-7e3b2cf0781a"
                        alt="The Cretan Company logo"
                    />
                </div>


                <textarea defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elementum dignissim orci et vestibulum. Fusce ac diam in dui vestibulum posuere. Nullam finibus non nisl sodales tincidunt. Pellentesque ut elit at tellus scelerisque lacinia eget ac libero. Cras volutpat urna nisl, in sagittis nibh bibendum eget. Donec at felis convallis, gravida lacus et, volutpat tellus. Integer non ex magna. Fusce porta massa vitae lorem posuere, vel cursus est tempor. Fusce porta tempus augue ut lobortis. Suspendisse neque diam, maximus at imperdiet luctus, tristique quis ex. Donec pellentesque leo viverra urna ullamcorper finibus. Vestibulum luctus laoreet erat vitae cursus. Praesent congue nulla arcu, id posuere nisi feugiat ac. Sed egestas gravida eros, eu consectetur lectus interdum in. "}>
                </textarea>

                <button onClick={() => scrollToSection('section2')} className="mt-auto mb-4 p-2 bg-white text-blue-500 rounded absolute">
                    More
                </button>

                <div className='w-full h-screen'>
                    <video className='h-screen w-full object-cover'
                        src={videoBG} autoPlay loop muted />
                </div>

            </div>
            <div id='section2' className='mt-40 h-screen'>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className="mt-2 m-auto lg:h-[600px] h-[350px] w-auto "
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




            </div>
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
