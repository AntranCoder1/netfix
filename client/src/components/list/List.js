import React, { useRef, useState } from 'react';
import ListItem from '../listItem/ListItem';
import ListItemG from '../listItem/ListItemG';
import './List.scss';
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { useSelector } from 'react-redux';

const List = ({ list }) => {

    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const user = useSelector(state => state.user.currentUser);

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);

        let distance = listRef.current.getBoundingClientRect().x - 50;

        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if (direction === "right" && slideNumber < 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    };

    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined
                    className="sliderArrow left"
                    onClick={() => handleClick("left")}
                    style={{ display: !isMoved && "none" }}
                />
                { user ? (
                    <div className="container" ref={listRef}>
                        { list.content.map((item, i) => (
                            <ListItem index={i} list={item} />
                        )) }
                    </div>
                ) : (
                    <div className="container" ref={listRef}>
                        { list.content.map((item, i) => (
                            <ListItemG index={i} list={item} />
                        )) }
                    </div>
                ) }
                <ArrowForwardIosOutlined
                    className="sliderArrow right"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    )
}

export default List
