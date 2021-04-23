import { useEffect, useState } from "react"
import './Carousel.css'


const Carousel = () => {
    const [data, setData] = useState([
        { id: 1, img: "thumbnail1.jpg" },
        { id: 2, img: "thumbnail2.jpg" },
        { id: 3, img: "thumbnail3.jpg" }
    ])
    const [slide, setSlide] = useState({
        id: 1, img: "thumbnail1.jpg"
    });
    const timeSlide = () => {
        if (slide.id === data.length) {
            const tmp = data.find((value) => value.id === 1);
            setSlide(tmp);
        } else {
            const tmp = data.find((value) => value.id === slide.id + 1);
            setSlide(tmp);
        }
    };
    useEffect(() => {

        const interval = setInterval(() => timeSlide(), 5000);
        return () => {
            clearInterval(interval)
        }
    }, [slide])

    const handlePrevious = (e) => {
        e.preventDefault();
        if (slide.id !== 1) {
            const { id, img } = data.find((value) => value.id === (slide.id - 1));
            setSlide({ ...slide, id, img });
        } else {
            setSlide(slide);
        }
    }

    const handleNext = (e) => {
        e.preventDefault();
        if (slide.id < data.length) {
            const { id, img } = data.find((value) => value.id === (slide.id + 1));
            setSlide({ ...slide, id, img });
        } else {
            setSlide(slide);
        }
    }

    const handleChange = (e, item) => {
        e.preventDefault();
        const { id, img } = data.find((value) => value.id === item);
        setSlide({ ...slide, id, img });
    }

    return (
        <div className='carousel-component'>
            <div>
                <img className='img-carousel' src={slide.img} alt="" />
                <a className='previous' onClick={handlePrevious}>&#10094;</a>
                <a className='next' onClick={handleNext}>&#10095;</a>
            </div>

            <div className="box-dot">
                {data.map((value, index) => <span key={index} className="dot" onClick={(e) => handleChange(e, value.id)}></span>)}
            </div>
        </div>
    )
}

export default Carousel