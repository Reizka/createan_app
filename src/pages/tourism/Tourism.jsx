import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './styles.css';

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

    return (
        <div className="relative h-screen ">

            <div>
                <div>
                    <img
                        className="m-auto w-auto sm:h-80 md:h-96 lg:h-[300px] xl:h-[300px] 2xl:h-[300px]"
                        src="https://firebasestorage.googleapis.com/v0/b/cretanapp.appspot.com/o/logo.svg?alt=media&token=c83a13ba-3f63-41c0-b32d-7e3b2cf0781a"
                        alt="The Cretan Company logo"
                    />
                </div>
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
