import React, { useEffect, useState } from 'react';
import './Scroll.scss';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const Scroll = () => {

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);


    return (
        <div className="scroll-to-top">
            {isVisible && 
                <div onClick={scrollToTop} className="scroll-to-top-icon">
                    <ArrowUpwardIcon className="icon" />
                </div>
            }
        </div>
    )
}

export default Scroll