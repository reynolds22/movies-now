import React, {useState, useEffect} from 'react';
import "./carousel.css";
import image1 from "./pics/Best-Movie.jpg";
import image2 from "./pics/Gladiator.avif";
import image3 from "./pics/new.webp";
import image4 from "./pics/older.jpeg"; 
import image5 from "./pics/JFHpU0id.jpeg";
import image6 from "./pics/animated.jpg";

const images = [image1, image2, image3, image4, image5, image6];

function Carousel(){
    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(()=>{
        const timer = setInterval(() => {
            setCurrentFrame(prevIndex => (prevIndex + 1) % images.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className='carousel'>
            <div 
                className="carousel-inner"
                style={{ transform: `translateX(-${currentFrame * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div 
                        className="carousel-item"
                        key={index}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
